const providerPresets = [
  {
    name: "Netflix",
    category: "Streaming",
    amount: 18.9,
    interval: "monthly",
    supportEmail: "info@netflix.com",
    address: "Online-Konto unter netflix.com",
  },
  {
    name: "Spotify Family",
    category: "Streaming",
    amount: 20.95,
    interval: "monthly",
    supportEmail: "support@spotify.com",
    address: "Online-Konto unter spotify.com",
  },
  {
    name: "NZZ Digital",
    category: "Zeitung",
    amount: 29,
    interval: "monthly",
    supportEmail: "service@nzz.ch",
    address: "NZZ Kundenservice, Falkenstrasse 11, 8021 Zuerich",
  },
  {
    name: "Tages-Anzeiger",
    category: "Zeitung",
    amount: 25,
    interval: "monthly",
    supportEmail: "kundendienst@tamedia.ch",
    address: "Tamedia Kundenservice, Werdstrasse 21, 8021 Zuerich",
  },
  {
    name: "Swisscom Mobile",
    category: "Handy Familie",
    amount: 69.9,
    interval: "monthly",
    supportEmail: "contact.center@swisscom.com",
    address: "Swisscom Kundendienst, 3050 Bern",
  },
  {
    name: "Sunrise Mobile",
    category: "Handy Familie",
    amount: 59.9,
    interval: "monthly",
    supportEmail: "contact@sunrise.net",
    address: "Sunrise Kundendienst, 8152 Glattpark",
  },
  {
    name: "Apple iCloud+",
    category: "Cloud",
    amount: 2.9,
    interval: "monthly",
    supportEmail: "",
    address: "Apple ID Abonnements",
  },
  {
    name: "Microsoft 365 Family",
    category: "Software",
    amount: 109,
    interval: "yearly",
    supportEmail: "",
    address: "Microsoft-Konto Abonnements",
  },
  {
    name: "Disney+",
    category: "Streaming",
    amount: 12.9,
    interval: "monthly",
    supportEmail: "",
    address: "Disney+ Konto",
  },
  {
    name: "CH Media Digital",
    category: "Zeitung",
    amount: 19.9,
    interval: "monthly",
    supportEmail: "abo@chmedia.ch",
    address: "CH Media Kundendienst",
  },
  {
    name: "Adobe Creative Cloud",
    category: "Software",
    amount: 64.95,
    interval: "monthly",
    supportEmail: "",
    address: "Adobe Account",
  },
];

const seedSubscriptions = [
  {
    id: crypto.randomUUID(),
    name: "NZZ Digital",
    category: "Zeitung",
    amount: 29,
    interval: "monthly",
    startDate: "2025-04-01",
    renewalDate: "2026-07-01",
    noticeDays: 30,
    status: "Aktiv",
    loginEmail: "familie@example.com",
    supportEmail: "service@nzz.ch",
    address: "NZZ Kundenservice, Falkenstrasse 11, 8021 Zuerich",
    familyMember: "",
    contractNumber: "KD-24019",
    pin: "",
    puk: "",
    notes: "Kuendigung via Kundenkonto oder E-Mail.",
  },
  {
    id: crypto.randomUUID(),
    name: "Swisscom Mobile Anna",
    category: "Handy Familie",
    amount: 39.9,
    interval: "monthly",
    startDate: "2025-09-15",
    renewalDate: "2026-06-30",
    noticeDays: 60,
    status: "Aktiv",
    loginEmail: "familie@example.com",
    supportEmail: "contact.center@swisscom.com",
    address: "Swisscom Kundendienst, 3050 Bern",
    familyMember: "Anna",
    contractNumber: "SIM 8941 0200 1234",
    pin: "2486",
    puk: "92837465",
    notes: "PIN nur fuer berechtigte Familienverwaltung anzeigen.",
  },
  {
    id: crypto.randomUUID(),
    name: "Microsoft 365 Family",
    category: "Software",
    amount: 109,
    interval: "yearly",
    startDate: "2024-12-10",
    renewalDate: "2026-12-10",
    noticeDays: 14,
    status: "Aktiv",
    loginEmail: "admin@example.com",
    supportEmail: "",
    address: "Microsoft-Konto Abonnements",
    familyMember: "Familie",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Pruefen, ob alle Lizenzen genutzt werden.",
  },
];

const storageKey = "abo-pilot-subscriptions";
const themeKey = "abo-pilot-theme";
const masterPassword = "pilot";

let subscriptions = [];
let selectedId = "";
let filterMode = "all";
let pendingSecretId = "";

const form = document.querySelector("#subscriptionForm");
const providerSearch = document.querySelector("#providerSearch");
const providerList = document.querySelector("#providerList");
const providerChips = document.querySelector("#providerChips");
const providerRail = document.querySelector("#providerRail");
const subscriptionList = document.querySelector("#subscriptionList");
const globalSearch = document.querySelector("#globalSearch");
const commandProviderSearch = document.querySelector("#commandProviderSearch");
const quickCategory = document.querySelector("#quickCategory");
const toast = document.querySelector("#toast");
const unlockDialog = document.querySelector("#unlockDialog");
const masterPasswordInput = document.querySelector("#masterPassword");

function field(id) {
  return document.querySelector(`#${id}`);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("de-CH", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

function cancellationDate(subscription) {
  const renewal = new Date(subscription.renewalDate);
  renewal.setDate(renewal.getDate() - Number(subscription.noticeDays || 0));
  return renewal;
}

function monthlyCost(subscription) {
  const amount = Number(subscription.amount || 0);
  if (subscription.interval === "yearly") return amount / 12;
  if (subscription.interval === "quarterly") return amount / 3;
  return amount;
}

function isDueSoon(subscription) {
  const today = new Date();
  const due = cancellationDate(subscription);
  return due >= today && due <= addDays(today, 45) && subscription.status !== "Gekuendigt";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(subscriptions));
}

function load() {
  const saved = localStorage.getItem(storageKey);
  subscriptions = saved ? JSON.parse(saved) : seedSubscriptions;
  selectedId = subscriptions[0]?.id || "";
  if (localStorage.getItem(themeKey) === "dark") {
    document.body.classList.add("dark");
  }
}

function applyPreset(preset) {
  providerSearch.value = preset.name;
  field("name").value = preset.name;
  field("category").value = preset.category;
  field("amount").value = preset.amount;
  field("interval").value = preset.interval;
  field("supportEmail").value = preset.supportEmail;
  field("address").value = preset.address;
  if (preset.category === "Handy Familie") {
    field("noticeDays").value = "60";
    field("familyMember").focus();
  } else {
    field("name").focus();
  }
}

function renderPresets() {
  providerList.innerHTML = providerPresets.map((provider) => `<option value="${provider.name}"></option>`).join("");
  providerChips.innerHTML = providerPresets
    .slice(0, 8)
    .map((provider) => `<button class="provider-chip" type="button" data-provider="${provider.name}">${provider.name}</button>`)
    .join("");
  providerRail.innerHTML = providerPresets
    .map((provider) => `<button class="provider-chip" type="button" data-provider="${provider.name}">${provider.name}</button>`)
    .join("");

  document.querySelectorAll(".provider-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = providerPresets.find((provider) => provider.name === button.dataset.provider);
      applyPreset(preset);
    });
  });
}

function renderMetrics() {
  const monthly = subscriptions.reduce((sum, subscription) => sum + monthlyCost(subscription), 0);
  const yearly = monthly * 12;
  const actionCount = subscriptions.filter(isDueSoon).length;
  const familyCount = subscriptions.filter((subscription) => subscription.category === "Handy Familie").length;
  const sortedDue = subscriptions
    .filter((subscription) => subscription.status !== "Gekuendigt")
    .slice()
    .sort((a, b) => cancellationDate(a) - cancellationDate(b));

  document.querySelector("#monthlyTotal").textContent = formatCurrency(monthly);
  document.querySelector("#yearlyTotal").textContent = formatCurrency(yearly);
  document.querySelector("#actionCount").textContent = actionCount;
  document.querySelector("#familyCount").textContent = familyCount;

  const next = sortedDue[0];
  document.querySelector("#nextDeadline").textContent = next ? next.name : "-";
  document.querySelector("#nextDeadlineMeta").textContent = next ? `Bis ${formatDate(cancellationDate(next))} kuendigen` : "Keine Daten";
}

function visibleSubscriptions() {
  const query = [globalSearch.value, commandProviderSearch.value].join(" ").trim().toLowerCase();
  const category = quickCategory.value;
  return subscriptions.filter((subscription) => {
    const matchesQuery = Object.values(subscription).join(" ").toLowerCase().includes(query);
    const matchesCategory = category === "Alle Kategorien" || subscription.category === category;
    const matchesFilter =
      filterMode === "all" ||
      (filterMode === "due" && isDueSoon(subscription)) ||
      (filterMode === "family" && subscription.category === "Handy Familie");
    return matchesQuery && matchesFilter && matchesCategory;
  });
}

function renderList() {
  const visible = visibleSubscriptions();
  subscriptionList.innerHTML = visible.length
    ? visible
        .map((subscription) => {
          const dueSoon = isDueSoon(subscription);
          const selected = subscription.id === selectedId ? "selected" : "";
          return `
            <article class="subscription-row ${selected}" data-id="${subscription.id}">
              <div class="subscription-main">
                <div class="subscription-title">
                  <strong>${subscription.name}</strong>
                  <span class="tag">${subscription.category}</span>
                  ${dueSoon ? `<span class="risk">Frist</span>` : ""}
                </div>
                <div class="subscription-meta">
                  <span>${subscription.status}</span>
                  <span>Erneuerung ${formatDate(subscription.renewalDate)}</span>
                  <span>Kuendigen bis ${formatDate(cancellationDate(subscription))}</span>
                  ${subscription.familyMember ? `<span>${subscription.familyMember}</span>` : ""}
                </div>
              </div>
              <div class="subscription-side">
                <span class="price">${formatCurrency(Number(subscription.amount || 0))}</span>
                <small>${subscription.interval === "yearly" ? "jaehrlich" : subscription.interval === "quarterly" ? "quartalsweise" : "monatlich"}</small>
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="detail-empty">Keine passenden Abos gefunden.</div>`;

  document.querySelectorAll(".subscription-row").forEach((row) => {
    row.addEventListener("click", () => {
      selectedId = row.dataset.id;
      render();
    });
  });
}

function secretValue(value, revealed) {
  if (!value) return "Nicht hinterlegt";
  return revealed ? value : "••••";
}

function renderDetail(revealed = false) {
  const subscription = subscriptions.find((item) => item.id === selectedId);
  const title = document.querySelector("#detailTitle");
  const status = document.querySelector("#detailStatus");
  const content = document.querySelector("#detailContent");

  if (!subscription) {
    title.textContent = "Abo auswaehlen";
    status.textContent = "-";
    content.className = "detail-empty";
    content.textContent = "Waehle ein Abo aus der Liste oder lege ein neues an.";
    return;
  }

  title.textContent = subscription.name;
  status.textContent = subscription.status;
  content.className = "detail-grid";
  content.innerHTML = `
    <div class="detail-item"><span>Kategorie</span><strong>${subscription.category}</strong></div>
    <div class="detail-item"><span>Kosten</span><strong>${formatCurrency(Number(subscription.amount || 0))} · ${subscription.interval}</strong></div>
    <div class="detail-item"><span>Kuendigung</span><strong>bis ${formatDate(cancellationDate(subscription))}</strong></div>
    <div class="detail-item"><span>Erneuerung</span><strong>${formatDate(subscription.renewalDate)}</strong></div>
    <div class="detail-item"><span>Login-E-Mail</span><strong>${subscription.loginEmail || "-"}</strong></div>
    <div class="detail-item"><span>Anbieter-Kontakt</span><strong>${subscription.supportEmail || subscription.address || "-"}</strong></div>
    <div class="detail-item"><span>Familie / Vertrag</span><strong>${subscription.familyMember || "-"} ${subscription.contractNumber ? "· " + subscription.contractNumber : ""}</strong></div>
    <div class="detail-item">
      <span>PIN / PUK</span>
      <div class="secret-row">
        <strong>PIN ${secretValue(subscription.pin, revealed)} · PUK ${secretValue(subscription.puk, revealed)}</strong>
        <button class="button subtle" id="revealSecret" type="button">Anzeigen</button>
      </div>
    </div>
    <div class="detail-item"><span>Notizen</span><strong>${subscription.notes || "-"}</strong></div>
    <button class="button subtle" id="cancelTemplate" type="button">Kuendigungstext erstellen</button>
  `;

  const revealButton = document.querySelector("#revealSecret");
  revealButton.disabled = !subscription.pin && !subscription.puk;
  revealButton.textContent = revealed ? "Ausblenden" : "Anzeigen";
  revealButton.addEventListener("click", () => {
    if (revealed) {
      renderDetail(false);
      return;
    }
    pendingSecretId = subscription.id;
    masterPasswordInput.value = "";
    unlockDialog.showModal();
    masterPasswordInput.focus();
  });

  document.querySelector("#cancelTemplate").addEventListener("click", () => {
    const text = `Hiermit kuendige ich mein Abo "${subscription.name}" mit der Kundennummer/Vertragsnummer ${subscription.contractNumber || "[bitte eintragen]"} fristgerecht zum naechstmoeglichen Termin. Bitte bestaetigen Sie mir die Kuendigung schriftlich.`;
    navigator.clipboard?.writeText(text);
    showToast("Kuendigungstext wurde vorbereitet und kopiert.");
  });
}

function render() {
  renderMetrics();
  renderList();
  renderDetail(false);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const subscription = {
    id: crypto.randomUUID(),
    name: field("name").value,
    category: field("category").value,
    amount: Number(field("amount").value || 0),
    interval: field("interval").value,
    startDate: field("startDate").value,
    renewalDate: field("renewalDate").value,
    noticeDays: Number(field("noticeDays").value),
    status: field("status").value,
    loginEmail: field("loginEmail").value,
    supportEmail: field("supportEmail").value,
    address: field("address").value,
    familyMember: field("familyMember").value,
    contractNumber: field("contractNumber").value,
    pin: field("pin").value,
    puk: field("puk").value,
    notes: field("notes").value,
  };

  subscriptions.unshift(subscription);
  selectedId = subscription.id;
  save();
  form.reset();
  render();
  showToast("Abo gespeichert.");
});

providerSearch.addEventListener("change", () => {
  const preset = providerPresets.find((provider) => provider.name.toLowerCase() === providerSearch.value.toLowerCase());
  if (preset) applyPreset(preset);
});

document.querySelector("#resetForm").addEventListener("click", () => {
  form.reset();
  providerSearch.value = "";
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    filterMode = button.dataset.filter;
    document.querySelectorAll(".segment").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    renderList();
  });
});

globalSearch.addEventListener("input", renderList);
commandProviderSearch.addEventListener("input", renderList);
quickCategory.addEventListener("change", renderList);

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(themeKey, document.body.classList.contains("dark") ? "dark" : "light");
});

document.querySelector("#unlockConfirm").addEventListener("click", (event) => {
  event.preventDefault();
  if (masterPasswordInput.value !== masterPassword) {
    showToast("Passwort stimmt nicht. Demo-Passwort: pilot");
    masterPasswordInput.select();
    return;
  }
  unlockDialog.close();
  selectedId = pendingSecretId;
  renderDetail(true);
  window.setTimeout(() => renderDetail(false), 12000);
});

load();
renderPresets();
render();
