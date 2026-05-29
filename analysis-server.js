const http = require("http");

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "0.0.0.0";
const ollamaBaseUrl = (process.env.OLLAMA_BASE_URL || "http://ollama:11434").replace(/\/$/, "");
const ollamaModel = process.env.OLLAMA_MODEL || "qwen2.5:3b";
const requestTimeoutMs = Number(process.env.ANALYSIS_TIMEOUT_MS || 20000);

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4_000_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

function monthlyCost(item) {
  const amount = Number(item.amount || 0);
  if (item.interval === "yearly") return amount / 12;
  if (item.interval === "quarterly") return amount / 3;
  return amount;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function cancellationDate(item) {
  if (item.noRenewal || !item.renewalDate) return null;
  const renewal = new Date(item.renewalDate);
  renewal.setDate(renewal.getDate() - Number(item.noticeDays || 0));
  return renewal;
}

function daysUntil(date) {
  return Math.ceil((startOfDay(date) - startOfDay(new Date())) / 86400000);
}

function formatDate(date) {
  if (!date || Number.isNaN(new Date(date).getTime())) return "-";
  return new Intl.DateTimeFormat("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 2,
  }).format(value);
}

function parseAmount(value) {
  if (!value) return null;
  const normalized = String(value)
    .replace(/CHF|EUR|USD|Fr\.?/gi, "")
    .replace(/'/g, "")
    .replace(/\s/g, "")
    .replace(",", ".");
  const match = normalized.match(/\d+(?:\.\d{1,2})?/);
  return match ? Number(match[0]) : null;
}

function normalizeDate(value) {
  if (!value) return "";
  const text = String(value).trim();
  const swiss = text.match(/\b(\d{1,2})[./-](\d{1,2})[./-](\d{4})\b/);
  if (swiss) {
    const [, day, month, year] = swiss;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const iso = text.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  return iso ? iso[0] : "";
}

function dataUrlToBuffer(dataUrl) {
  const match = String(dataUrl || "").match(/^data:application\/pdf(?:;[^,]*)?,(.+)$/);
  if (!match) {
    throw new Error("Nur PDF-Data-URLs werden akzeptiert.");
  }
  return Buffer.from(match[1], "base64");
}

function textValueAfterLabel(text, labels) {
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\s*[:\\-]?\\s*([^\\n]{2,120})`, "i");
    const match = text.match(pattern);
    if (match) return match[1].trim();
  }
  return "";
}

function cleanIdentifier(value) {
  return String(value || "")
    .split(/\b(?:Jahresprämie|Jahrespraemie|Prämie|Praemie|Versicherungsbeginn|Beginn|Ablauf|Kündigung|Kuendigung|CHF|Fr\.?)\b/i)[0]
    .trim()
    .replace(/[.,;:]$/, "");
}

function fallbackDocumentFields(text, currentSubscription = {}) {
  const compact = text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const policyNumber = cleanIdentifier(
    textValueAfterLabel(compact, ["Policen(?:nummer)?", "Police Nr\\.?","Vertragsnummer", "Kundennummer"]) ||
      compact.match(/\b(?:Police|Policennummer|Vertrag|Vertragsnummer)\D{0,24}([A-Z0-9][A-Z0-9 .\\/-]{4,50})/i)?.[1]?.trim() ||
      ""
  );
  const amountText =
    compact.match(/\b(?:Prämie|Praemie|Jahresprämie|Jahrespraemie|Betrag|Total)\D{0,40}(?:CHF|Fr\.?)?\s*([\d'.,]+)\b/i)?.[1] ||
    compact.match(/\b(?:CHF|Fr\.?)\s*([\d'.,]+)\b/i)?.[1] ||
    "";
  const startDate =
    normalizeDate(textValueAfterLabel(compact, ["Beginn", "Vertragsbeginn", "Versicherungsbeginn", "Gueltig ab", "Gültig ab"])) ||
    normalizeDate(compact.match(/\b(?:ab|Beginn)\D{0,20}(\d{1,2}[./-]\d{1,2}[./-]\d{4})/i)?.[1]);
  const renewalDate =
    normalizeDate(textValueAfterLabel(compact, ["Ablauf", "Vertragsablauf", "Gueltig bis", "Gültig bis", "Ende"])) ||
    normalizeDate(compact.match(/\b(?:bis|Ablauf)\D{0,20}(\d{1,2}[./-]\d{1,2}[./-]\d{4})/i)?.[1]);
  const noticeDaysMatch = compact.match(/\b(\d{1,3})\s*(?:Tage|Tag|days)\b.{0,60}\b(?:künd|kuend|Kündigung|Kuendigung)/i);
  const noticeDaysReverseMatch = compact.match(/\b(?:künd|kuend|Kündigung|Kuendigung)\D{0,60}\b(\d{1,3})\s*(?:Tage|Tag|days)\b/i);
  const noticeMonthsMatch = compact.match(/\b(\d{1,2})\s*(?:Monate|Monat)\b.{0,60}\b(?:künd|kuend|Kündigung|Kuendigung)/i);
  const noticeDays = noticeDaysMatch
    ? Number(noticeDaysMatch[1])
    : noticeDaysReverseMatch
      ? Number(noticeDaysReverseMatch[1])
      : noticeMonthsMatch
        ? Number(noticeMonthsMatch[1]) * 30
        : null;

  return {
    provider: textValueAfterLabel(compact, ["Versicherer", "Anbieter", "Gesellschaft"]) || "",
    name: currentSubscription.name || textValueAfterLabel(compact, ["Produkt", "Versicherung", "Police"]) || "",
    category: currentSubscription.category || "Police",
    policyNumber,
    amount: parseAmount(amountText),
    interval: /monatlich|pro monat/i.test(compact) ? "monthly" : "yearly",
    startDate,
    renewalDate,
    noticeDays,
    supportEmail: compact.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "",
    address: textValueAfterLabel(compact, ["Kontakt", "Adresse"]) || "",
    summary: "Automatisch aus dem PDF-Text abgeleitete Felder. Bitte vor dem Übernehmen prüfen.",
    confidence: "mittel",
  };
}

function sanitizeSubscription(item) {
  return {
    name: String(item.name || "").slice(0, 140),
    category: String(item.category || "").slice(0, 80),
    amount: Number(item.amount || 0),
    interval: item.interval,
    startDate: item.startDate,
    renewalDate: item.renewalDate,
    endDate: item.endDate,
    noRenewal: Boolean(item.noRenewal),
    noticeDays: Number(item.noticeDays || 0),
    status: item.status,
    tags: Array.isArray(item.tags) ? item.tags.map((tag) => String(tag).slice(0, 40)).slice(0, 8) : [],
    reminderDate: item.reminderDate,
    reminderChannel: item.reminderChannel,
    familyMember: String(item.familyMember || "").slice(0, 80),
    hasDocuments: Boolean(item.documents?.length),
    notes: String(item.notes || "").slice(0, 500),
  };
}

function buildRuleAnalysis(items) {
  const active = items.filter((item) => item.status !== "Gekuendigt" && item.status !== "Pausiert");
  const nonCanceled = items.filter((item) => item.status !== "Gekuendigt");
  const monthly = active.reduce((sum, item) => sum + monthlyCost(item), 0);
  const yearly = monthly * 12;
  const deadlines = nonCanceled
    .filter((item) => !item.noRenewal && item.renewalDate)
    .map((item) => {
      const cancelBy = cancellationDate(item);
      return {
        name: item.name,
        category: item.category,
        cancelBy: cancelBy.toISOString(),
        cancelByLabel: formatDate(cancelBy),
        days: daysUntil(cancelBy),
        renewalDate: item.renewalDate,
      };
    })
    .filter((item) => item.days <= 45)
    .sort((a, b) => a.days - b.days);

  const missingAmounts = nonCanceled.filter((item) => Number(item.amount || 0) === 0);
  const paused = items.filter((item) => item.status === "Pausiert");
  const policies = items.filter((item) => item.category === "Police");
  const phones = items.filter((item) => item.category === "Handy Familie");
  const topCosts = active.slice().sort((a, b) => monthlyCost(b) - monthlyCost(a)).slice(0, 5);

  const recommendations = [];
  if (deadlines.some((item) => item.days < 0)) {
    recommendations.push("Überfällige Kündigungsfristen zuerst prüfen und Status aktualisieren.");
  }
  if (deadlines.some((item) => item.days >= 0 && item.days <= 14)) {
    recommendations.push("Fristen der nächsten 14 Tage als konkrete Aufgaben markieren.");
  }
  if (missingAmounts.length) {
    recommendations.push(`${missingAmounts.length} Verträge haben noch Betrag 0 und verfälschen die Kostensicht.`);
  }
  if (paused.length) {
    recommendations.push("Pausierte Abos mit automatischer Reaktivierung im Auge behalten.");
  }
  if (policies.some((item) => Number(item.amount || 0) === 0)) {
    recommendations.push("Policenbeträge ergänzen, damit Versicherungen im Jahresbudget sichtbar werden.");
  }
  if (!recommendations.length) {
    recommendations.push("Bestand wirkt gepflegt. Nächster Hebel: Dokumente und Kündigungswege vervollständigen.");
  }

  return {
    generatedAt: new Date().toISOString(),
    totals: {
      activeCount: active.length,
      allCount: items.length,
      monthly,
      yearly,
      monthlyLabel: formatCurrency(monthly),
      yearlyLabel: formatCurrency(yearly),
      policyCount: policies.length,
      phoneCount: phones.length,
    },
    deadlines,
    missingAmounts: missingAmounts.map((item) => item.name),
    topCosts: topCosts.map((item) => ({
      name: item.name,
      category: item.category,
      monthly: monthlyCost(item),
      monthlyLabel: formatCurrency(monthlyCost(item)),
    })),
    recommendations,
  };
}

function fallbackSummary(ruleAnalysis) {
  const urgent = ruleAnalysis.deadlines.filter((item) => item.days <= 14).length;
  const missing = ruleAnalysis.missingAmounts.length;
  const lead = urgent
    ? `${urgent} Fristen liegen in den nächsten 14 Tagen oder sind bereits überfällig.`
    : "Aktuell gibt es keine extrem knappen Fristen.";
  const costNote = `Die aktiven laufenden Kosten liegen bei ${ruleAnalysis.totals.monthlyLabel} pro Monat bzw. ${ruleAnalysis.totals.yearlyLabel} pro Jahr.`;
  const dataNote = missing
    ? `${missing} Einträge haben noch keinen Betrag und sollten ergänzt werden.`
    : "Die Beträge sind für die aktuelle Auswertung vollständig genug.";
  return `${lead} ${costNote} ${dataNote}`;
}

async function askOllama(ruleAnalysis, items) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const prompt = [
    "Du bist die interne Analyse-Schicht einer Schweizer Abo-Verwaltungs-App.",
    "Antworte kurz, konkret und auf Deutsch.",
    "Nutze die Regelanalyse als Wahrheit fuer Zahlen und Fristen.",
    "Gib keine sensiblen Daten aus und erfinde keine Vertragsdetails.",
    "",
    "Regelanalyse:",
    JSON.stringify(ruleAnalysis),
    "",
    "Auszug aus dem Bestand:",
    JSON.stringify(items.slice(0, 40)),
    "",
    "Erstelle genau drei Abschnitte: Kurzfazit, Naechste Schritte, Auffaelligkeiten.",
  ].join("\n");

  try {
    const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        options: {
          temperature: 0.2,
          num_ctx: 4096,
          num_predict: 420,
        },
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Ollama returned ${response.status}`);
    }
    const body = await response.json();
    return body.message?.content?.trim() || "";
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeExtractedFields(fields, fallback) {
  const allowedCategories = new Set(["Zeitung", "Magazin", "Online-Abo", "Streaming", "Software", "Handy Familie", "Cloud", "Police", "Sonstiges"]);
  const category = String(fields.category || fallback.category || "Police").slice(0, 80);
  const normalized = {
    provider: String(fields.provider || fallback.provider || "").slice(0, 120),
    name: String(fields.name || fallback.name || "").slice(0, 160),
    category: allowedCategories.has(category) ? category : fallback.category || "Police",
    policyNumber: String(fields.policyNumber || fields.contractNumber || fallback.policyNumber || "").slice(0, 120),
    amount: parseAmount(fields.amount) ?? fallback.amount,
    interval: ["monthly", "quarterly", "yearly"].includes(fields.interval) ? fields.interval : fallback.interval || "yearly",
    startDate: normalizeDate(fields.startDate) || fallback.startDate || "",
    renewalDate: normalizeDate(fields.renewalDate) || fallback.renewalDate || "",
    endDate: normalizeDate(fields.endDate) || fallback.endDate || "",
    noRenewal: Boolean(fields.noRenewal || fallback.noRenewal),
    noticeDays: Number.isFinite(Number(fields.noticeDays)) ? Number(fields.noticeDays) : fallback.noticeDays,
    supportEmail: String(fields.supportEmail || fallback.supportEmail || "").slice(0, 160),
    address: String(fields.address || fallback.address || "").slice(0, 240),
    summary: String(fields.summary || fallback.summary || "").slice(0, 700),
    confidence: String(fields.confidence || fallback.confidence || "mittel").slice(0, 40),
  };
  if (!Number.isFinite(normalized.amount)) normalized.amount = null;
  if (!Number.isFinite(normalized.noticeDays)) normalized.noticeDays = null;
  return normalized;
}

async function askOllamaForDocument(text, fallbackFields, currentSubscription) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const prompt = [
    "Du extrahierst Daten aus einem Schweizer Vertrags- oder Policen-PDF fuer Abo Pilot.",
    "Antworte ausschliesslich als valides JSON ohne Markdown.",
    "Erfinde keine Daten. Wenn ein Feld nicht klar im Text steht, verwende null oder leeren String.",
    "Datumsformat immer YYYY-MM-DD. Intervall: monthly, quarterly oder yearly.",
    "Felder: provider, name, category, policyNumber, amount, interval, startDate, renewalDate, endDate, noRenewal, noticeDays, supportEmail, address, summary, confidence.",
    "",
    "Bestehender App-Eintrag:",
    JSON.stringify(currentSubscription || {}),
    "",
    "Heuristische Voranalyse:",
    JSON.stringify(fallbackFields),
    "",
    "PDF-Textauszug:",
    text.slice(0, 12000),
  ].join("\n");

  try {
    const response = await fetch(`${ollamaBaseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        format: "json",
        options: {
          temperature: 0,
          num_ctx: 8192,
          num_predict: 600,
        },
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
    const body = await response.json();
    return JSON.parse(body.message?.content || "{}");
  } finally {
    clearTimeout(timeout);
  }
}

async function extractPdfText(dataUrl) {
  const buffer = dataUrlToBuffer(dataUrl);
  let pdfParse;
  try {
    pdfParse = require("pdf-parse");
  } catch (error) {
    throw new Error("PDF-Parser ist nicht installiert. Bitte Analyse-Container mit Dockerfile.analysis bauen.");
  }
  const parsed = await pdfParse(buffer, { max: 12 });
  return String(parsed.text || "").replace(/\u0000/g, "").trim();
}

async function handleAnalyzeDocument(request, response) {
  try {
    const payload = await readJson(request);
    const document = payload.document || {};
    const currentSubscription = sanitizeSubscription(payload.currentSubscription || {});
    const text = payload.text ? String(payload.text) : await extractPdfText(document.dataUrl);

    if (!text || text.length < 20) {
      sendJson(response, 422, {
        error: "Aus dem PDF konnte kaum Text gelesen werden.",
        detail: "Falls es ein Scan ist, braucht die App später OCR.",
      });
      return;
    }

    const fallbackFields = fallbackDocumentFields(text, currentSubscription);
    let source = "rules";
    let extracted = fallbackFields;

    try {
      const modelFields = await askOllamaForDocument(text, fallbackFields, currentSubscription);
      extracted = normalizeExtractedFields(modelFields, fallbackFields);
      source = "ollama";
    } catch (error) {
      extracted = normalizeExtractedFields({}, fallbackFields);
    }

    sendJson(response, 200, {
      source,
      model: source === "ollama" ? ollamaModel : null,
      documentName: String(document.name || "").slice(0, 180),
      textPreview: text.slice(0, 1200),
      extracted,
    });
  } catch (error) {
    sendJson(response, 400, {
      error: "PDF konnte nicht analysiert werden.",
      detail: error.message,
    });
  }
}

async function handleAnalyze(request, response) {
  try {
    const payload = await readJson(request);
    const items = Array.isArray(payload.subscriptions) ? payload.subscriptions.map(sanitizeSubscription) : [];
    const ruleAnalysis = buildRuleAnalysis(items);
    let modelSummary = "";
    let modelStatus = "fallback";

    try {
      modelSummary = await askOllama(ruleAnalysis, items);
      modelStatus = modelSummary ? "ollama" : "fallback";
    } catch (error) {
      modelSummary = "";
    }

    sendJson(response, 200, {
      source: modelStatus,
      model: modelStatus === "ollama" ? ollamaModel : null,
      summary: modelSummary || fallbackSummary(ruleAnalysis),
      ruleAnalysis,
    });
  } catch (error) {
    sendJson(response, 400, {
      error: "Analyse konnte nicht erstellt werden.",
      detail: error.message,
    });
  }
}

const server = http.createServer((request, response) => {
  if (request.method === "GET" && (request.url === "/health" || request.url === "/api/health")) {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/api/analyze") {
    handleAnalyze(request, response);
    return;
  }

  if (request.method === "POST" && request.url === "/api/analyze-document") {
    handleAnalyzeDocument(request, response);
    return;
  }

  sendJson(response, 404, { error: "Not found" });
});

server.listen(port, host, () => {
  console.log(`Abo Pilot analysis server listening on ${port}`);
});
