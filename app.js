const providerPresets = [
  {
    name: "Netflix",
    category: "Streaming",
    amount: 18.9,
    interval: "monthly",
    supportEmail: "info@netflix.com",
    address: "Online-Konto unter netflix.com",
    logo: "https://cdn.simpleicons.org/netflix/e50914",
  },
  {
    name: "Spotify Family",
    category: "Streaming",
    amount: 20.95,
    interval: "monthly",
    supportEmail: "support@spotify.com",
    address: "Online-Konto unter spotify.com",
    logo: "https://cdn.simpleicons.org/spotify/1db954",
  },
  {
    name: "NZZ Digital",
    category: "Zeitung",
    amount: 29,
    interval: "monthly",
    supportEmail: "service@nzz.ch",
    address: "NZZ Kundenservice, Falkenstrasse 11, 8021 Zuerich",
    logo: "https://cdn.simpleicons.org/nzz/000000",
  },
  {
    name: "Tages-Anzeiger",
    category: "Zeitung",
    amount: 25,
    interval: "monthly",
    supportEmail: "kundendienst@tamedia.ch",
    address: "Tamedia Kundenservice, Werdstrasse 21, 8021 Zuerich",
    logo: "",
  },
  {
    name: "Swisscom Mobile",
    category: "Handy Familie",
    amount: 69.9,
    interval: "monthly",
    supportEmail: "contact.center@swisscom.com",
    address: "Swisscom Kundendienst, 3050 Bern",
    logo: "https://cdn.simpleicons.org/swisscom/e30613",
  },
  {
    name: "Sunrise Mobile",
    category: "Handy Familie",
    amount: 59.9,
    interval: "monthly",
    supportEmail: "contact@sunrise.net",
    address: "Sunrise Kundendienst, 8152 Glattpark",
    logo: "https://cdn.simpleicons.org/sunrise/f58220",
  },
  {
    name: "Apple iCloud+",
    category: "Cloud",
    amount: 2.9,
    interval: "monthly",
    supportEmail: "",
    address: "Apple ID Abonnements",
    logo: "https://cdn.simpleicons.org/icloud/3693f3",
  },
  {
    name: "Microsoft 365 Family",
    category: "Software",
    amount: 109,
    interval: "yearly",
    supportEmail: "",
    address: "Microsoft-Konto Abonnements",
    logo: "https://cdn.simpleicons.org/microsoft/5e5e5e",
  },
  {
    name: "Disney+",
    category: "Streaming",
    amount: 12.9,
    interval: "monthly",
    supportEmail: "",
    address: "Disney+ Konto",
    logo: "https://cdn.simpleicons.org/disneyplus/113ccf",
  },
  {
    name: "CH Media Digital",
    category: "Zeitung",
    amount: 19.9,
    interval: "monthly",
    supportEmail: "abo@chmedia.ch",
    address: "CH Media Kundendienst",
    logo: "",
  },
  {
    name: "Adobe Creative Cloud",
    category: "Software",
    amount: 64.95,
    interval: "monthly",
    supportEmail: "",
    address: "Adobe Account",
    logo: "https://cdn.simpleicons.org/adobe/ff0000",
  },
  {
    name: "Hostinger",
    category: "Software",
    amount: 155.54,
    interval: "yearly",
    supportEmail: "team@info.hostinger.com",
    address: "Hostinger Konto",
    logo: "https://cdn.simpleicons.org/hostinger/673de6",
  },
  {
    name: "yallo",
    category: "Online-Abo",
    amount: 0,
    interval: "monthly",
    supportEmail: "info@notifications.yallo.ch",
    address: "yallo Kundencenter",
    logo: "",
  },
  {
    name: "Apple TV+",
    category: "Streaming",
    amount: 10.9,
    interval: "monthly",
    supportEmail: "",
    address: "Apple ID Abonnements",
    logo: "https://cdn.simpleicons.org/appletv/000000",
  },
  {
    name: "CSS Versicherung",
    category: "Police",
    amount: 0,
    interval: "yearly",
    supportEmail: "",
    address: "CSS Kundenkonto / Policen",
    logo: "",
  },
  {
    name: "AXA Versicherung",
    category: "Police",
    amount: 0,
    interval: "yearly",
    supportEmail: "",
    address: "AXA Kundenportal / Policen",
    logo: "https://cdn.simpleicons.org/axa/00008f",
  },
];

const routeMeta = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Abos, Kosten, Fristen und Familien-Handyverträge im Überblick.",
  },
  subscriptions: {
    title: "Abos",
    subtitle: "Bestand pflegen, Details prüfen und neue Abos strukturiert erfassen.",
  },
  family: {
    title: "Handy",
    subtitle: "Handy-Verträge, SIM-Daten und Zuständigkeiten getrennt von normalen Abos verwalten.",
  },
  deadlines: {
    title: "Fristen",
    subtitle: "Kündigungsfristen und Erneuerungen priorisiert bearbeiten.",
  },
  policies: {
    title: "Policen",
    subtitle: "Versicherungen und Policen als eigene Vertragsgruppe im Blick behalten.",
  },
  archive: {
    title: "Archiv",
    subtitle: "Beendete Abos, Handy-Verträge und Policen bleiben nachvollziehbar abgelegt.",
  },
  security: {
    title: "Sicherheit",
    subtitle: "Sensible Daten bleiben maskiert und für SaaS-Betrieb klar abgegrenzt.",
  },
  saas: {
    title: "SaaS Admin",
    subtitle: "Ausbaupfad für Mandanten, Rollen, Reminder und Datenschutz.",
  },
};

const seedSubscriptions = [
  {
    id: "seed-hostinger-vps-2026",
    name: "Hostinger KVM 2 VPS + Daily Backup",
    category: "Software",
    amount: 155.54,
    interval: "yearly",
    startDate: "2026-05-25",
    renewalDate: "2027-05-25",
    noticeDays: 30,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "team@info.hostinger.com",
    address: "Hostinger Konto",
    familyMember: "",
    contractNumber: "Rechnung H_43891123",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert: KVM 2 1 Jahr CHF 85.21 plus Daily Backup 1 Jahr CHF 58.68, total bezahlt CHF 155.54.",
  },
  {
    id: "seed-lfi-print-abo-2026",
    name: "LFI Print-Abo",
    category: "Zeitung",
    amount: 95,
    interval: "yearly",
    startDate: "2026-03-24",
    renewalDate: "2027-03-24",
    noticeDays: 30,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "lfi@aboteam.de",
    address: "LFI Abo- und Bestellservice, Postfach 1331, 53335 Meckenheim",
    familyMember: "",
    contractNumber: "Bestellung 24.03.2026/176908 · Rechnung 2637302932 · Kunde 7406446",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Betrag ist EUR 95.00 inkl. Versand; im MVP aktuell als Zahlenwert erfasst.",
  },
  {
    id: "seed-sunrise-swiss-travel-2025",
    name: "Sunrise Swiss Travel",
    category: "Handy Familie",
    amount: 29.9,
    interval: "monthly",
    startDate: "2025-11-30",
    renewalDate: "2026-11-30",
    noticeDays: 30,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "no-reply@support.sunrise.ch",
    address: "Sunrise Kundendienst, Thurgauerstrasse 101B, 8152 Glattpark",
    familyMember: "Daniel",
    contractNumber: "Kundennummer 8110444584 · Bestellung O111964481 · 079 767 66 38",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Mindestvertragsdauer 12 Monate; schriftliche Kündigung laut Mail nicht gültig, Kündigung telefonisch oder per Sunrise Chat.",
  },
  {
    id: "seed-yallo-home-supermax-2025",
    name: "yallo Home Supermax Cable + TV",
    category: "Online-Abo",
    amount: 0,
    interval: "monthly",
    startDate: "2025-11-04",
    renewalDate: "2026-11-04",
    noticeDays: 30,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "info@notifications.yallo.ch",
    address: "yallo Kundencenter",
    familyMember: "",
    contractNumber: "Bestellnummer BB25499097",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Abowechsel abgeschlossen am 04.11.2025; Preis bitte ergänzen.",
  },
  {
    id: "seed-disney-standard-2025",
    name: "Disney+ Standard",
    category: "Streaming",
    amount: 16.9,
    interval: "monthly",
    startDate: "2025-12-20",
    renewalDate: "2026-06-20",
    noticeDays: 1,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "disneyplus@trx.mail2.disneyplus.com",
    address: "Disney+ Konto",
    familyMember: "",
    contractNumber: "Zahlungsart ECMC endet auf 8401",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Verlängert sich monatlich automatisch, sofern nicht vorher gekündigt.",
  },
  {
    id: "seed-adobe-photo-2026",
    name: "Adobe Foto-Abo 20 GB",
    category: "Software",
    amount: 142.7,
    interval: "yearly",
    startDate: "2026-01-06",
    renewalDate: "2027-01-06",
    noticeDays: 14,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "store@adobe.com",
    address: "Adobe Konto",
    familyMember: "",
    contractNumber: "Bestellnummer AB06733700156CCH",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Jahres-Abo mit Vorauszahlung CHF 132.00 plus VAT CHF 10.70.",
  },
  {
    id: "seed-abrp-apple-2025",
    name: "A Better Routeplanner (ABRP)",
    category: "Online-Abo",
    amount: 5.5,
    interval: "monthly",
    startDate: "2025-07-09",
    renewalDate: "2026-06-09",
    noticeDays: 1,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "",
    address: "Apple ID Abonnements",
    familyMember: "",
    contractNumber: "Iternio Planning AB",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Apple Abo-Bestätigung: CHF 5.50 pro Monat, Kündigung mindestens 1 Tag vor Verlängerung.",
  },
  {
    id: "seed-apple-tv-2024",
    name: "Apple TV+",
    category: "Streaming",
    amount: 10.9,
    interval: "monthly",
    startDate: "2024-10-03",
    renewalDate: "2026-06-03",
    noticeDays: 1,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "",
    address: "Apple ID Abonnements",
    familyMember: "",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Bitte prüfen, ob dieses ältere Apple-Abo noch aktiv ist.",
  },
  {
    id: "seed-flightradar24-gold-2024",
    name: "Flightradar24 Gold Plan",
    category: "Online-Abo",
    amount: 35,
    interval: "yearly",
    startDate: "2024-06-30",
    renewalDate: "2026-06-30",
    noticeDays: 1,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "",
    address: "Apple ID Abonnements",
    familyMember: "",
    contractNumber: "Flightradar24 AB",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Apple Abo-Bestätigung: CHF 35.00 pro Jahr, bitte Status prüfen.",
  },
  {
    id: "seed-netflix-paused-2026",
    name: "Netflix",
    category: "Streaming",
    amount: 0,
    interval: "monthly",
    startDate: "2026-05-18",
    renewalDate: "2026-06-18",
    noticeDays: 1,
    status: "Pausiert",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "info@account.netflix.com",
    address: "Netflix Konto",
    familyMember: "",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Pause vom 18.05.2026 bis 18.06.2026; danach wird die Abrechnung automatisch fortgesetzt. Preis bitte ergänzen.",
  },
  {
    id: "seed-chatgpt-plus-2026",
    name: "ChatGPT Plus",
    category: "Software",
    amount: 20,
    interval: "monthly",
    startDate: "2026-05-05",
    renewalDate: "2026-06-05",
    noticeDays: 0,
    status: "Gekuendigt",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "noreply@tm.openai.com",
    address: "ChatGPT Konto",
    familyMember: "",
    contractNumber: "sub_1TTezDKslHRdbaPg118x0jnR",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Gekündigt/nicht verlängert; verfügbar bis 05.06.2026.",
  },
  {
    id: "seed-swisscom-blue-mobile-2025",
    name: "Swisscom blue Mobile M",
    category: "Handy Familie",
    amount: 0,
    interval: "monthly",
    startDate: "2025-12-01",
    renewalDate: "2026-01-30",
    noticeDays: 0,
    status: "Gekuendigt",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "contact.center@swisscom.com",
    address: "Swisscom Kundendienst, 3050 Bern",
    familyMember: "Daniel",
    contractNumber: "Rufnummer 079 *** *6 38",
    pin: "",
    puk: "",
    notes: "Aus Gmail importiert. Abschaltung laut Kündigungsbestätigung per 30.01.2026.",
  },
  {
    id: "seed-css-reiseversicherung-2026",
    name: "CSS Reiseversicherung",
    category: "Police",
    amount: 0,
    interval: "once",
    startDate: "2026-05-27",
    renewalDate: "",
    endDate: "2026-06-25",
    noRenewal: true,
    noticeDays: 0,
    status: "Aktiv",
    loginEmail: "daniel.kupper1@gmail.com",
    supportEmail: "",
    address: "CSS Kundenkonto",
    familyMember: "",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus Gmail als einmalige 30-Tage-Reiseversicherung importiert. Betrag bitte mit der Prämie/Totalrechnung ergänzen.",
  },
  {
    id: "seed-css-krankenkasse-daniel-2025",
    name: "CSS Krankenversicherung Daniel",
    category: "Police",
    amount: 0,
    interval: "monthly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Steuerbelege 2025/Krankenkasse/Steuerauszug - 2025 - Daniel Kupper.pdf",
    familyMember: "Daniel",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Betrag und Policennummer bitte ergänzen.",
  },
  {
    id: "seed-css-krankenkasse-lars-2025",
    name: "CSS Krankenversicherung Lars",
    category: "Police",
    amount: 0,
    interval: "monthly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Steuerbelege 2025/Krankenkasse/Steuerauszug - 2025 - Lars Kupper.pdf",
    familyMember: "Lars",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Betrag und Policennummer bitte ergänzen.",
  },
  {
    id: "seed-css-krankenkasse-amelie-2025",
    name: "CSS Krankenversicherung Amelie",
    category: "Police",
    amount: 0,
    interval: "monthly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Steuerbelege 2025/Krankenkasse/Steuerauszug - 2025 - Amelie Kupper.pdf",
    familyMember: "Amelie",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Betrag und Policennummer bitte ergänzen.",
  },
  {
    id: "seed-css-krankenkasse-aline-2025",
    name: "CSS Krankenversicherung Aline",
    category: "Police",
    amount: 0,
    interval: "monthly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Steuerbelege 2025/Krankenkasse/Steuerauszug - 2025 - Aline Kupper.pdf",
    familyMember: "Aline",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Betrag und Policennummer bitte ergänzen.",
  },
  {
    id: "seed-axa-daniel-2025",
    name: "AXA Police Daniel",
    category: "Police",
    amount: 0,
    interval: "yearly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Privat/AXA_Kupper_Daniel_27019120_VNA[81].pdf",
    familyMember: "Daniel",
    contractNumber: "27019120",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Details bitte ergänzen.",
  },
  {
    id: "seed-zurich-kupper-2025",
    name: "Zurich / KDG MF Kupper",
    category: "Police",
    amount: 0,
    interval: "yearly",
    startDate: "2025-01-01",
    renewalDate: "2026-12-31",
    noticeDays: 90,
    status: "Aktiv",
    loginEmail: "",
    supportEmail: "",
    address: "Dokumente: /Users/daniel/Documents/Privat/KDG MF Zurich Kupper.pdf",
    familyMember: "",
    contractNumber: "",
    pin: "",
    puk: "",
    notes: "Aus lokalem Dokumentenordner als Police/Kandidat aufgenommen. Details bitte ergänzen.",
  },
];

const storageKey = "abo-pilot-subscriptions";
const importVersionKey = "abo-pilot-import-version";
const currentImportVersion = "2026-05-29-gmail-docs";
const themeKey = "abo-pilot-theme";
const avatarKey = "abo-pilot-avatar";
const masterPassword = "pilot";

let subscriptions = [];
let selectedId = "";
let filterMode = "all";
let pendingSecretId = "";
let documentAnalysis = null;

const form = document.querySelector("#subscriptionForm");
const avatarUpload = document.querySelector("#avatarUpload");
const avatarPreview = document.querySelector("#avatarPreview");
const avatarMark = document.querySelector(".brand-mark");
const editorDialog = document.querySelector("#editorDialog");
const editorTitle = document.querySelector("#editorTitle");
const providerSearch = document.querySelector("#providerSearch");
const providerList = document.querySelector("#providerList");
const providerChips = document.querySelector("#providerChips");
const providerRail = document.querySelector("#providerRail");
const subscriptionList = document.querySelector("#subscriptionList");
const canceledActiveSection = document.querySelector("#canceledActiveSection");
const canceledActiveList = document.querySelector("#canceledActiveList");
const canceledActiveCount = document.querySelector("#canceledActiveCount");
const globalSearch = document.querySelector("#globalSearch");
const commandProviderSearch = document.querySelector("#commandProviderSearch");
const quickCategory = document.querySelector("#quickCategory");
const deadlineStatus = document.querySelector("#deadlineStatus");
const deadlineAgenda = document.querySelector("#deadlineAgenda");
const renewalCalendar = document.querySelector("#renewalCalendar");
const familyFields = document.querySelector("#familyFields");
const saveSubscriptionButton = document.querySelector("#saveSubscription");
const familyOverview = document.querySelector("#familyOverview");
const familyDetailSummary = document.querySelector("#familyDetailSummary");
const policyOverview = document.querySelector("#policyOverview");
const policyDetailSummary = document.querySelector("#policyDetailSummary");
const archiveOverview = document.querySelector("#archiveOverview");
const archiveDetailSummary = document.querySelector("#archiveDetailSummary");
const archiveCount = document.querySelector("#archiveCount");
const securitySummary = document.querySelector("#securitySummary");
const adminSummary = document.querySelector("#adminSummary");
const analysisContent = document.querySelector("#analysisContent");
const analysisSource = document.querySelector("#analysisSource");
const toast = document.querySelector("#toast");
const unlockDialog = document.querySelector("#unlockDialog");
const masterPasswordInput = document.querySelector("#masterPassword");
const deleteDialog = document.querySelector("#deleteDialog");
const deleteDialogTitle = document.querySelector("#deleteDialogTitle");
const deleteDialogText = document.querySelector("#deleteDialogText");

let editingId = "";
let currentRoute = "dashboard";
let pendingDeleteId = "";
let pendingDeleteDocumentId = "";
let pendingSecretRender = null;

function field(id) {
  return document.querySelector(`#${id}`);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfDay(date) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
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

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function cancellationDate(subscription) {
  if (isOneTime(subscription)) return null;
  if (!subscription.renewalDate) return null;
  const renewal = new Date(subscription.renewalDate);
  renewal.setDate(renewal.getDate() - Number(subscription.noticeDays || 0));
  return renewal;
}

function isOneTime(subscription) {
  return Boolean(subscription.noRenewal || subscription.interval === "once");
}

function monthlyCost(subscription) {
  const amount = Number(subscription.amount || 0);
  if (isOneTime(subscription)) return 0;
  if (subscription.interval === "yearly") return amount / 12;
  if (subscription.interval === "quarterly") return amount / 3;
  return amount;
}

function isDueSoon(subscription) {
  if (isOneTime(subscription)) return false;
  const today = startOfDay(new Date());
  const cancelBy = cancellationDate(subscription);
  if (!cancelBy) return false;
  const due = startOfDay(cancelBy);
  return due <= addDays(today, 45) && subscription.status !== "Gekuendigt";
}

function daysUntil(date) {
  const diff = startOfDay(date) - startOfDay(new Date());
  return Math.ceil(diff / 86400000);
}

function deadlineTone(days) {
  if (days < 0) return "overdue";
  if (days <= 14) return "hot";
  if (days <= 45) return "warm";
  return "calm";
}

function deadlineLabel(days) {
  if (days < 0) return `${Math.abs(days)} Tage überfällig`;
  if (days === 0) return "Heute handeln";
  if (days === 1) return "Morgen";
  return `in ${days} Tagen`;
}

function displayStatus(status) {
  return status === "Gekuendigt" ? "Gekündigt" : status;
}

function isCanceled(subscription) {
  return subscription.status === "Gekuendigt";
}

function effectiveEndDate(subscription) {
  return subscription.endDate || subscription.renewalDate || subscription.startDate || "";
}

function isArchived(subscription) {
  if (!isCanceled(subscription)) return false;
  const endDate = effectiveEndDate(subscription);
  if (!endDate) return false;
  return startOfDay(new Date(endDate)) < startOfDay(new Date());
}

function isCanceledStillActive(subscription) {
  return isCanceled(subscription) && !isArchived(subscription);
}

function contractTypeLabel(subscription) {
  if (subscription.category === "Police") return "Police";
  if (subscription.category === "Handy Familie") return "Handy-Abo";
  return "Abo";
}

function statusClass(status) {
  if (status === "Gekuendigt") return "status-canceled";
  if (status === "Pausiert") return "status-paused";
  return "status-active";
}

function setFilterMode(mode) {
  filterMode = mode;
  document.querySelectorAll(".segment").forEach((segment) => {
    segment.classList.toggle("active", segment.dataset.filter === filterMode);
  });
  const visible = visibleSubscriptions();
  if (visible.length && !visible.some((subscription) => subscription.id === selectedId)) {
    selectedId = visible[0].id;
  }
  renderList();
  renderDetail(false);
  renderInsights();
  renderArchive();
}

function isCoreSubscription(subscription) {
  return subscription.category !== "Police" && subscription.category !== "Handy Familie";
}

function intervalLabel(interval) {
  if (interval === "once") return "einmalig";
  if (interval === "yearly") return "jährlich";
  if (interval === "quarterly") return "quartalsweise";
  return "monatlich";
}

function renewalLabel(subscription) {
  if (isOneTime(subscription)) return "Keine Erneuerung";
  return formatDate(subscription.renewalDate);
}

function cancellationLabel(subscription) {
  const cancelBy = cancellationDate(subscription);
  if (isOneTime(subscription)) return "Keine Kündigungsfrist";
  return cancelBy ? formatDate(cancelBy) : "-";
}

function documentCountLabel(subscription) {
  const count = subscription.documents?.length || 0;
  if (!count) return "Keine PDFs";
  return `${count} PDF${count === 1 ? "" : "s"}`;
}

function normalizeTags(value) {
  const source = Array.isArray(value) ? value.join(",") : value;
  return String(source || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function tagMarkup(tags = []) {
  return normalizeTags(tags)
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function reminderChannelLabel(channel) {
  if (channel === "email") return "E-Mail";
  if (channel === "calendar") return "Kalender";
  if (channel === "app") return "App";
  return "Noch keiner";
}

function providerLogoMarkup(provider) {
  const initial = escapeHtml(provider.name.slice(0, 1));
  const logo = provider.logo
    ? `<img src="${escapeHtml(provider.logo)}" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode('${initial}'))" />`
    : `<span>${initial}</span>`;
  return `<span class="provider-logo" aria-hidden="true">${logo}</span>`;
}

function normalizeRoute(route) {
  return routeMeta[route] ? route : "dashboard";
}

function routeFromHash() {
  return normalizeRoute(window.location.hash.replace("#", "") || "dashboard");
}

function routeForSubscription(subscription) {
  if (subscription.category === "Handy Familie") return "family";
  if (subscription.category === "Police") return "policies";
  return "subscriptions";
}

function setRoute(route, shouldUpdateHash = true) {
  currentRoute = normalizeRoute(route);
  if (currentRoute === "subscriptions") {
    const selected = subscriptions.find((item) => item.id === selectedId);
    if (!selected || !isCoreSubscription(selected) || isArchived(selected)) {
      selectedId = subscriptions.find((subscription) => isCoreSubscription(subscription) && !isArchived(subscription))?.id || "";
    }
  }
  if (currentRoute === "archive") {
    const archived = subscriptions.filter(isArchived);
    if (archived.length && !archived.some((subscription) => subscription.id === selectedId)) {
      selectedId = archived[0].id;
    }
  }
  document.querySelectorAll(".page-view").forEach((view) => {
    const pages = (view.dataset.page || "").split(" ");
    view.classList.toggle("active", pages.includes(currentRoute));
  });
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === currentRoute);
  });
  document.querySelector("#pageTitle").textContent = routeMeta[currentRoute].title;
  document.querySelector("#pageSubtitle").textContent = routeMeta[currentRoute].subtitle;
  if (shouldUpdateHash && window.location.hash !== `#${currentRoute}`) {
    history.pushState(null, "", `#${currentRoute}`);
  }
  if (subscriptions.length) {
    renderList();
    renderDetail(false);
    renderInsights();
    renderArchive();
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

function cancellationText(subscription) {
  return `Hiermit kündige ich meinen Vertrag / mein Abo "${subscription.name}" mit der Kundennummer/Vertragsnummer ${subscription.contractNumber || "[bitte eintragen]"} fristgerecht zum nächstmöglichen Termin.\n\nBitte bestätigen Sie mir die Kündigung schriftlich.\n\nFreundliche Grüsse`;
}

async function sendCancellationEmail(subscription) {
  if (!subscription.supportEmail) {
    showToast("Keine Anbieter-E-Mail hinterlegt.");
    return;
  }

  const subject = `Kündigung ${subscription.name}`;
  const text = cancellationText(subscription);
  const shouldSend = window.confirm(`Kündigung an ${subscription.supportEmail} senden?`);
  if (!shouldSend) return;

  try {
    const response = await fetch("/api/send-cancellation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: subscription.supportEmail,
        subject,
        text,
        subscriptionId: subscription.id,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.detail || result.error || "Mail-Service nicht erreichbar");
    }
    showToast("Kündigungs-E-Mail wurde gesendet.");
  } catch (error) {
    showToast(error.message || "E-Mail konnte nicht gesendet werden.");
  }
}

function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(subscriptions));
    return true;
  } catch (error) {
    showToast("Speicher voll. Bitte kleinere PDFs verwenden oder Dokument entfernen.");
    return false;
  }
}

function mergeImportedSubscriptions(items) {
  const existingIds = new Set(subscriptions.map((subscription) => subscription.id));
  const existingNames = new Set(subscriptions.map((subscription) => subscription.name.toLowerCase()));
  const additions = items.filter(
    (subscription) => !existingIds.has(subscription.id) && !existingNames.has(subscription.name.toLowerCase())
  );
  if (!additions.length) return false;
  subscriptions = [...additions, ...subscriptions];
  return true;
}

function addDaysIso(dateValue, days) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function normalizeStoredSubscriptions() {
  let changed = false;
  subscriptions.forEach((subscription) => {
    if (subscription.interval === "once" && !subscription.noRenewal) {
      subscription.noRenewal = true;
      subscription.renewalDate = "";
      subscription.noticeDays = 0;
      changed = true;
    }
    if (/CSS Reiseversicherung/i.test(subscription.name || "")) {
      if (subscription.interval !== "once" || !subscription.noRenewal || subscription.renewalDate || Number(subscription.noticeDays || 0) !== 0) {
        subscription.interval = "once";
        subscription.noRenewal = true;
        subscription.renewalDate = "";
        subscription.noticeDays = 0;
        changed = true;
      }
      if (!subscription.endDate && subscription.startDate) {
        subscription.endDate = addDaysIso(subscription.startDate, 29);
        changed = true;
      }
    }
  });
  return changed;
}

function load() {
  const saved = localStorage.getItem(storageKey);
  subscriptions = saved ? JSON.parse(saved) : [];
  const shouldImport = localStorage.getItem(importVersionKey) !== currentImportVersion;
  if (shouldImport && mergeImportedSubscriptions(seedSubscriptions)) {
    save();
  }
  if (shouldImport) {
    localStorage.setItem(importVersionKey, currentImportVersion);
  }
  if (!subscriptions.length) {
    subscriptions = seedSubscriptions;
    save();
  }
  if (normalizeStoredSubscriptions()) {
    save();
  }
  selectedId = subscriptions[0]?.id || "";
  if (localStorage.getItem(themeKey) === "dark") {
    document.body.classList.add("dark");
  }
  setAvatar(localStorage.getItem(avatarKey) || "");
}

function setAvatar(dataUrl) {
  if (!avatarPreview || !avatarMark) return;
  avatarPreview.src = dataUrl || "";
  avatarMark.classList.toggle("has-avatar", Boolean(dataUrl));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(themeKey, document.body.classList.contains("dark") ? "dark" : "light");
}

function applyPreset(preset) {
  providerSearch.value = preset.name;
  commandProviderSearch.value = preset.name;
  field("name").value = preset.name;
  field("category").value = preset.category;
  field("amount").value = preset.amount;
  field("interval").value = preset.interval;
  field("supportEmail").value = preset.supportEmail;
  field("address").value = preset.address;
  toggleFamilyFields();
  toggleRenewalFields();
  if (preset.category === "Handy Familie") {
    field("noticeDays").value = "60";
    field("familyMember").focus();
  } else {
    field("name").focus();
  }
}

function toggleFamilyFields() {
  const isFamily = field("category").value === "Handy Familie";
  familyFields.classList.toggle("is-collapsed", !isFamily);
}

function toggleRenewalFields() {
  const isPolicy = field("category").value === "Police";
  const isCanceledStatus = field("status").value === "Gekuendigt";
  document.querySelector("#endDateLabel").classList.toggle("is-collapsed", !isPolicy && !isCanceledStatus);
  document.querySelector("#noRenewalLabel").classList.toggle("is-collapsed", !isPolicy);
  if (!isPolicy) {
    field("noRenewal").checked = false;
    if (!isCanceledStatus) {
      field("endDate").value = "";
    }
  }
  const noRenewal = field("noRenewal").checked || field("interval").value === "once";
  if (field("noRenewal").checked && field("interval").value !== "once") {
    field("interval").value = "once";
  }
  if (field("interval").value === "once") {
    field("noRenewal").checked = true;
  }
  field("renewalDate").disabled = noRenewal;
  field("noticeDays").disabled = noRenewal;
  if ((noRenewal || isCanceledStatus) && !field("endDate").value && field("renewalDate").value) {
    field("endDate").value = field("renewalDate").value;
  }
}

function formTitleValue() {
  const nameValue = field("name").value.trim();
  const providerValue = providerSearch.value.trim();
  const originalProviderValue = providerSearch.dataset.originalValue || "";
  if (providerValue && (!nameValue || nameValue === originalProviderValue)) {
    return providerValue;
  }
  return nameValue;
}

function subscriptionFromForm(id = crypto.randomUUID()) {
  const existing = subscriptions.find((subscription) => subscription.id === id);
  return {
    id,
    name: formTitleValue(),
    category: field("category").value,
    amount: Number(field("amount").value || 0),
    interval: field("interval").value,
    startDate: field("startDate").value,
    renewalDate: field("noRenewal").checked || field("interval").value === "once" ? "" : field("renewalDate").value,
    endDate: field("endDate").value || (field("status").value === "Gekuendigt" ? field("renewalDate").value : ""),
    noRenewal: field("noRenewal").checked || field("interval").value === "once",
    noticeDays: field("noRenewal").checked || field("interval").value === "once" ? 0 : Number(field("noticeDays").value),
    status: field("status").value,
    tags: normalizeTags(field("tags").value),
    reminderDate: field("reminderDate").value,
    reminderChannel: field("reminderChannel").value,
    loginEmail: field("loginEmail").value,
    supportEmail: field("supportEmail").value,
    address: field("address").value,
    familyMember: field("familyMember").value,
    contractNumber: field("contractNumber").value,
    pin: field("pin").value,
    puk: field("puk").value,
    notes: field("notes").value,
    documents: existing?.documents || [],
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

async function uploadedDocuments() {
  const input = field("documentUpload");
  return documentsFromFiles(input.files);
}

async function documentsFromFiles(fileList) {
  const files = Array.from(fileList || []);
  const maxBytes = 1.5 * 1024 * 1024;
  const documents = [];

  for (const file of files) {
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      showToast("Nur PDF-Dateien können hinzugefügt werden.");
      return null;
    }
    if (file.size > maxBytes) {
      showToast(`${file.name} ist zu gross. Maximal 1.5 MB pro PDF.`);
      return null;
    }
    documents.push({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type || "application/pdf",
      uploadedAt: new Date().toISOString(),
      dataUrl: await readFileAsDataUrl(file),
    });
  }

  return documents;
}

async function subscriptionFromFormWithDocuments(id = crypto.randomUUID()) {
  const subscription = subscriptionFromForm(id);
  const additions = await uploadedDocuments();
  if (additions === null) return null;
  subscription.documents = [...(subscription.documents || []), ...additions];
  return subscription;
}

function populateForm(subscription) {
  providerSearch.value = subscription.name;
  providerSearch.dataset.originalValue = subscription.name;
  field("name").value = subscription.name;
  field("category").value = subscription.category;
  field("amount").value = subscription.amount;
  field("interval").value = subscription.interval;
  field("startDate").value = subscription.startDate;
  field("renewalDate").value = subscription.renewalDate;
  field("endDate").value = subscription.endDate || (subscription.noRenewal ? subscription.renewalDate : "");
  field("noRenewal").checked = Boolean(subscription.noRenewal);
  field("noticeDays").value = subscription.noticeDays;
  field("status").value = subscription.status;
  field("tags").value = normalizeTags(subscription.tags).join(", ");
  field("reminderDate").value = subscription.reminderDate || "";
  field("reminderChannel").value = subscription.reminderChannel || "none";
  field("loginEmail").value = subscription.loginEmail;
  field("supportEmail").value = subscription.supportEmail;
  field("address").value = subscription.address;
  field("familyMember").value = subscription.familyMember;
  field("contractNumber").value = subscription.contractNumber;
  field("pin").value = subscription.pin;
  field("puk").value = subscription.puk;
  field("notes").value = subscription.notes;
  field("documentUpload").value = "";
  toggleFamilyFields();
  toggleRenewalFields();
}

function resetEditor() {
  editingId = "";
  form.reset();
  providerSearch.value = "";
  providerSearch.dataset.originalValue = "";
  commandProviderSearch.value = "";
  field("documentUpload").value = "";
  editorTitle.textContent = "Abo anlegen";
  saveSubscriptionButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>Abo speichern`;
  toggleFamilyFields();
  toggleRenewalFields();
}

function openEditor(subscription = null, presetCategory = "") {
  if (subscription) {
    editingId = subscription.id;
    populateForm(subscription);
    editorTitle.textContent = `${subscription.category === "Police" ? "Police" : subscription.category === "Handy Familie" ? "Handy-Abo" : "Abo"} bearbeiten`;
    saveSubscriptionButton.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" /></svg>Änderungen speichern`;
  } else {
    resetEditor();
    if (presetCategory) {
      field("category").value = presetCategory;
      editorTitle.textContent = `${presetCategory === "Police" ? "Police" : presetCategory === "Handy Familie" ? "Handy-Abo" : "Abo"} anlegen`;
      toggleFamilyFields();
      toggleRenewalFields();
    }
  }
  editorDialog.showModal();
  field("name").focus();
}

function startEditing(subscription) {
  openEditor(subscription);
}

function setSubscriptionStatus(id, status) {
  const subscription = subscriptions.find((item) => item.id === id);
  if (!subscription) return;
  subscription.status = status;
  if (status === "Gekuendigt" && !subscription.endDate) {
    subscription.endDate = subscription.renewalDate || new Date().toISOString().slice(0, 10);
  }
  selectedId = id;
  save();
  render();
}

function requestDeleteSubscription(id) {
  const subscription = subscriptions.find((item) => item.id === id);
  if (!subscription) return;
  pendingDeleteId = id;
  pendingDeleteDocumentId = "";
  const type = subscription.category === "Police" ? "Police" : subscription.category === "Handy Familie" ? "Handy-Abo" : "Abo";
  deleteDialogTitle.textContent = `${type} löschen?`;
  deleteDialogText.textContent = `"${subscription.name}" wird aus diesem Browser entfernt. Diese Aktion kann nicht rückgängig gemacht werden.`;
  deleteDialog.showModal();
}

function requestDeleteDocument(subscriptionId, documentId) {
  const subscription = subscriptions.find((item) => item.id === subscriptionId);
  const document = subscription?.documents?.find((item) => item.id === documentId);
  if (!subscription || !document) return;
  pendingDeleteId = subscriptionId;
  pendingDeleteDocumentId = documentId;
  deleteDialogTitle.textContent = "PDF löschen?";
  deleteDialogText.textContent = `"${document.name}" wird aus diesem Eintrag entfernt. Diese Aktion kann nicht rückgängig gemacht werden.`;
  deleteDialog.showModal();
}

function deleteSubscription(id) {
  const subscription = subscriptions.find((item) => item.id === id);
  if (!subscription) return;
  const type = subscription.category === "Police" ? "Police" : subscription.category === "Handy Familie" ? "Handy-Abo" : "Abo";
  subscriptions = subscriptions.filter((item) => item.id !== id);
  if (documentAnalysis?.subscriptionId === id) {
    documentAnalysis = null;
  }
  selectedId = subscriptions[0]?.id || "";
  save();
  render();
  showToast(`${type} gelöscht.`);
}

function deleteDocument(subscriptionId, documentId) {
  const subscription = subscriptions.find((item) => item.id === subscriptionId);
  if (!subscription) return;
  const previousCount = subscription.documents?.length || 0;
  subscription.documents = (subscription.documents || []).filter((item) => item.id !== documentId);
  if ((subscription.documents?.length || 0) === previousCount) return;
  if (documentAnalysis?.subscriptionId === subscriptionId) {
    documentAnalysis = null;
  }
  selectedId = subscriptionId;
  save();
  render();
  showToast("PDF gelöscht.");
}

async function addDocumentsToSubscription(subscriptionId, fileList) {
  const subscription = subscriptions.find((item) => item.id === subscriptionId);
  if (!subscription) return;
  const additions = await documentsFromFiles(fileList);
  if (additions === null || !additions.length) return;
  const previousDocuments = subscription.documents || [];
  subscription.documents = [...previousDocuments, ...additions];
  selectedId = subscriptionId;
  if (!save()) {
    subscription.documents = previousDocuments;
    render();
    return;
  }
  render();
  showToast(additions.length === 1 ? "PDF hinzugefügt." : `${additions.length} PDFs hinzugefügt.`);
}

function renderPresets() {
  const category = selectedQuickCategory();
  const railPresets = category === "Alle Kategorien" ? providerPresets : providerPresets.filter((provider) => provider.category === category);
  providerList.innerHTML = providerPresets.map((provider) => `<option value="${escapeHtml(provider.name)}"></option>`).join("");
  providerChips.innerHTML = providerPresets
    .slice(0, 8)
    .map(
      (provider) =>
        `<button class="provider-chip logo-chip" type="button" data-provider="${escapeHtml(provider.name)}">${providerLogoMarkup(provider)}<span>${escapeHtml(provider.name)}</span></button>`
    )
    .join("");
  providerRail.innerHTML = railPresets.length
    ? railPresets
        .map(
          (provider) =>
            `<button class="provider-chip provider-card" type="button" data-provider="${escapeHtml(provider.name)}">${providerLogoMarkup(provider)}<span>${escapeHtml(provider.name)}</span></button>`
        )
        .join("")
    : `<span class="provider-empty">Keine Anbieter-Vorlagen</span>`;

  document.querySelectorAll(".provider-chip").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = providerPresets.find((provider) => provider.name === button.dataset.provider);
      applyPreset(preset);
      if (button.classList.contains("provider-card")) {
        setRoute("subscriptions");
      }
    });
  });
}

function applyPresetByName(value, shouldScroll = false) {
  const preset = providerPresets.find((provider) => provider.name.toLowerCase() === value.trim().toLowerCase());
  if (!preset) return false;
  applyPreset(preset);
  if (shouldScroll) {
    setRoute("subscriptions");
    document.querySelector("#subscriptionForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function renderMetrics(sourceSubscriptions = subscriptions) {
  const billable = sourceSubscriptions.filter((subscription) => subscription.status !== "Gekuendigt" && subscription.status !== "Pausiert" && !isOneTime(subscription));
  const monthly = billable.reduce((sum, subscription) => sum + monthlyCost(subscription), 0);
  const yearly = monthly * 12;
  const actionable = sourceSubscriptions.filter(isDueSoon);
  const overdueCount = actionable.filter((subscription) => daysUntil(cancellationDate(subscription)) < 0).length;
  const actionCount = actionable.length;
  const familyCount = sourceSubscriptions.filter((subscription) => subscription.category === "Handy Familie").length;
  const sortedDue = sourceSubscriptions
    .filter((subscription) => subscription.status !== "Gekuendigt" && !isOneTime(subscription) && cancellationDate(subscription))
    .slice()
    .sort((a, b) => cancellationDate(a) - cancellationDate(b));

  document.querySelector("#monthlyTotal").textContent = formatCurrency(monthly);
  document.querySelector("#yearlyTotal").textContent = formatCurrency(yearly);
  document.querySelector("#actionCount").textContent = actionCount;
  document.querySelector("#familyCount").textContent = familyCount;
  document.querySelector("#actionMeta").textContent = overdueCount
    ? `${overdueCount} überfällig, ${actionCount - overdueCount} bald`
    : "Fristen in 45 Tagen";

  const next = sortedDue[0];
  document.querySelector("#nextDeadline").textContent = next ? next.name : "-";
  document.querySelector("#nextDeadlineMeta").textContent = next ? `Bis ${formatDate(cancellationDate(next))} kündigen` : "Keine Daten";
}

function analysisPayload() {
  return subscriptions.map((subscription) => ({
    name: subscription.name,
    category: subscription.category,
    amount: subscription.amount,
    interval: subscription.interval,
    renewalDate: subscription.renewalDate,
    endDate: subscription.endDate,
    noRenewal: subscription.noRenewal,
    noticeDays: subscription.noticeDays,
    status: subscription.status,
    tags: normalizeTags(subscription.tags),
    reminderDate: subscription.reminderDate,
    reminderChannel: subscription.reminderChannel,
    familyMember: subscription.familyMember,
    notes: subscription.notes,
    documents: (subscription.documents || []).map((document) => ({ name: document.name, size: document.size })),
  }));
}

function renderAnalysisResult(result) {
  const analysis = result.ruleAnalysis;
  const sourceLabel = result.source === "ollama" ? `Ollama intern · ${result.model}` : "Regelbasierte Auswertung";
  analysisSource.textContent = sourceLabel;
  analysisContent.innerHTML = `
    <div class="analysis-summary">${escapeHtml(result.summary).replaceAll("\n", "<br />")}</div>
    <div class="analysis-stats">
      <span><strong>${escapeHtml(analysis.totals.monthlyLabel)}</strong><small>pro Monat aktiv</small></span>
      <span><strong>${escapeHtml(analysis.totals.yearlyLabel)}</strong><small>pro Jahr aktiv</small></span>
      <span><strong>${analysis.deadlines.length}</strong><small>Fristen in 45 Tagen</small></span>
      <span><strong>${analysis.missingAmounts.length}</strong><small>Beträge offen</small></span>
    </div>
    <div class="analysis-columns">
      <div>
        <h3>Nächste Fristen</h3>
        ${
          analysis.deadlines.length
            ? analysis.deadlines
                .slice(0, 5)
                .map((item) => `<p><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.cancelByLabel)} · ${deadlineLabel(item.days)}</small></p>`)
                .join("")
            : `<p><strong>Keine knappen Fristen</strong><small>Im 45-Tage-Fenster ist aktuell nichts offen.</small></p>`
        }
      </div>
      <div>
        <h3>Empfehlungen</h3>
        ${analysis.recommendations.map((item) => `<p><strong>${escapeHtml(item)}</strong></p>`).join("")}
      </div>
    </div>
  `;
}

async function runAnalysis() {
  analysisSource.textContent = "Analyse läuft";
  analysisContent.innerHTML = `<div class="detail-empty">Auswertung wird erstellt. Wenn Ollama schläft, kann das einen Moment dauern.</div>`;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptions: analysisPayload() }),
    });

    if (!response.ok) {
      throw new Error("Analyse-Service nicht erreichbar");
    }

    const result = await response.json();
    renderAnalysisResult(result);
    showToast(result.source === "ollama" ? "Ollama-Auswertung aktualisiert." : "Regel-Auswertung aktualisiert.");
  } catch (error) {
    analysisSource.textContent = "Analyse nicht verfügbar";
    analysisContent.innerHTML = `
      <div class="detail-empty">
        Die Analyse-Schicht ist lokal noch nicht erreichbar. Starte später den Docker-Service oder nutze bis dahin die Kennzahlen und Fristen im Dashboard.
      </div>
    `;
    showToast("Analyse-Service nicht erreichbar.");
  }
}

function currentSubscriptionForAnalysis(subscription) {
  return {
    name: subscription.name,
    category: subscription.category,
    amount: subscription.amount,
    interval: subscription.interval,
    startDate: subscription.startDate,
    renewalDate: subscription.renewalDate,
    endDate: subscription.endDate,
    noRenewal: subscription.noRenewal,
    noticeDays: subscription.noticeDays,
    status: subscription.status,
    familyMember: subscription.familyMember,
    notes: subscription.notes,
  };
}

function applyDocumentAnalysis() {
  if (!documentAnalysis) return;
  const subscription = subscriptions.find((item) => item.id === documentAnalysis.subscriptionId);
  if (!subscription) return;
  const fields = documentAnalysis.result.extracted;

  if (fields.name && (!subscription.name || subscription.name.includes("Kandidat"))) subscription.name = fields.name;
  if (fields.category) subscription.category = fields.category;
  if (Number(fields.amount) > 0 && Number(subscription.amount || 0) === 0) subscription.amount = Number(fields.amount);
  if (fields.interval) subscription.interval = fields.interval;
  if (fields.startDate && !subscription.startDate) subscription.startDate = fields.startDate;
  if (fields.renewalDate) subscription.renewalDate = fields.renewalDate;
  if (fields.endDate) subscription.endDate = fields.endDate;
  if (fields.noRenewal || fields.interval === "once") {
    subscription.noRenewal = true;
    subscription.interval = "once";
    subscription.renewalDate = "";
    subscription.noticeDays = 0;
  }
  if (!isOneTime(subscription) && Number.isFinite(Number(fields.noticeDays))) subscription.noticeDays = Number(fields.noticeDays);
  if (fields.policyNumber && !subscription.contractNumber) subscription.contractNumber = fields.policyNumber;
  if (fields.supportEmail && !subscription.supportEmail) subscription.supportEmail = fields.supportEmail;
  if (fields.address && !subscription.address) subscription.address = fields.address;
  if (fields.summary) {
    const note = `PDF-Auswertung: ${fields.summary}`;
    subscription.notes = subscription.notes ? `${subscription.notes}\n\n${note}` : note;
  }

  selectedId = subscription.id;
  save();
  render();
  showToast("PDF-Vorschlag übernommen.");
}

function renderDocumentAnalysisResult() {
  if (!documentAnalysis || documentAnalysis.subscriptionId !== selectedId) return "";
  const result = documentAnalysis.result;
  const fields = result.extracted;
  const amount = Number(fields.amount || 0);
  const sourceLabel =
    result.source === "loading"
      ? "PDF-Auswertung"
      : result.source === "error"
        ? "Analyse nicht verfügbar"
        : result.source === "ollama"
          ? `Ollama · ${escapeHtml(result.model)}`
          : "Regel-Auswertung";
  return `
    <div class="document-analysis ${result.source === "error" ? "is-error" : ""}">
      <div class="document-analysis-head">
        <span>${sourceLabel}</span>
        <strong>${escapeHtml(result.documentName || "PDF")}</strong>
      </div>
      <div class="document-fields">
        <div><span>Anbieter</span><strong>${escapeHtml(fields.provider || "-")}</strong></div>
        <div><span>Name</span><strong>${escapeHtml(fields.name || "-")}</strong></div>
        <div><span>Police / Vertrag</span><strong>${escapeHtml(fields.policyNumber || "-")}</strong></div>
        <div><span>Betrag</span><strong>${amount ? formatCurrency(amount) : "-"}</strong></div>
        <div><span>Intervall</span><strong>${intervalLabel(fields.interval || "yearly")}</strong></div>
        <div><span>Beginn</span><strong>${formatDate(fields.startDate)}</strong></div>
        <div><span>Erneuerung</span><strong>${fields.noRenewal || fields.interval === "once" ? "Keine Erneuerung" : formatDate(fields.renewalDate)}</strong></div>
        <div><span>Bis</span><strong>${formatDate(fields.endDate)}</strong></div>
        <div><span>Kündigungsfrist</span><strong>${fields.noticeDays ?? "-"} Tage</strong></div>
      </div>
      <p>${escapeHtml(fields.summary || "Bitte die erkannten Werte prüfen, bevor du sie übernimmst.")}</p>
      ${
        result.source === "error" || result.source === "loading"
          ? ""
          : `<div class="detail-actions">
              <button class="button primary" id="applyDocumentAnalysis" type="button">In Eintrag übernehmen</button>
            </div>`
      }
    </div>
  `;
}

function refreshCurrentDetailView() {
  if (currentRoute === "subscriptions") {
    renderDetail(false);
    return;
  }
  renderInsights();
}

async function analyzeDocument(documentId) {
  const subscription = subscriptions.find((item) => item.id === selectedId);
  const document = subscription?.documents?.find((item) => item.id === documentId);
  if (!subscription || !document) return;

  documentAnalysis = {
    subscriptionId: subscription.id,
    result: {
      source: "loading",
      documentName: document.name,
      extracted: {
        summary: "PDF wird ausgelesen und analysiert.",
        interval: "yearly",
      },
    },
  };
  refreshCurrentDetailView();

  try {
    const response = await fetch("/api/analyze-document", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document: {
          name: document.name,
          type: document.type,
          dataUrl: document.dataUrl,
        },
        currentSubscription: currentSubscriptionForAnalysis(subscription),
      }),
    });

    if (!response.ok) {
      let message = "PDF konnte nicht analysiert werden.";
      try {
        const errorResult = await response.json();
        message = errorResult.detail || errorResult.error || message;
      } catch {
        if (response.status === 404 || response.status === 405) {
          message = "Der Analyse-Service ist nicht gestartet. Starte Docker oder die Analyse-API, dann kann die App PDFs auslesen.";
        }
      }
      throw new Error(message);
    }

    const result = await response.json();
    if (!result?.extracted) {
      throw new Error(result.detail || result.error || "PDF konnte nicht analysiert werden.");
    }

    documentAnalysis = { subscriptionId: subscription.id, result };
    refreshCurrentDetailView();
    showToast(result.source === "ollama" ? "PDF mit Ollama analysiert." : "PDF regelbasiert analysiert.");
  } catch (error) {
    documentAnalysis = {
      subscriptionId: subscription.id,
      result: {
        source: "error",
        documentName: document.name,
        extracted: {
          summary: error.message,
          interval: "yearly",
        },
      },
    };
    refreshCurrentDetailView();
    showToast("PDF-Analyse nicht verfügbar.");
  }
}

function renderDeadlines(sourceSubscriptions = subscriptions) {
  const active = sourceSubscriptions.filter((subscription) => subscription.status !== "Gekuendigt");
  const deadlines = active
    .filter((subscription) => !isOneTime(subscription))
    .map((subscription) => {
      const cancelBy = cancellationDate(subscription);
      return {
        ...subscription,
        cancelBy,
        days: daysUntil(cancelBy),
      };
    })
    .filter((subscription) => subscription.cancelBy)
    .sort((a, b) => a.cancelBy - b.cancelBy);
  const urgent = deadlines.filter((item) => item.days <= 45).length;
  const overdue = deadlines.filter((item) => item.days < 0).length;

  deadlineStatus.textContent = overdue ? `${overdue} überfällig` : `${urgent} offen`;
  deadlineAgenda.innerHTML = deadlines.length
    ? deadlines
        .slice(0, 6)
        .map((subscription) => {
          const tone = deadlineTone(subscription.days);
          const targetRoute = routeForSubscription(subscription);
          return `
            <a class="deadline-item ${tone}" href="#${targetRoute}" data-id="${subscription.id}">
              <span class="deadline-date">${formatDate(subscription.cancelBy)}</span>
              <span class="deadline-copy">
                <strong>${escapeHtml(subscription.name)}</strong>
                <small>${deadlineLabel(subscription.days)} kündigen · Erneuerung ${formatDate(subscription.renewalDate)}</small>
              </span>
              <span class="deadline-badge">${escapeHtml(subscription.category)}</span>
            </a>
          `;
        })
        .join("")
    : `<div class="detail-empty">Keine aktiven Fristen vorhanden.</div>`;

  const monthFormatter = new Intl.DateTimeFormat("de-CH", { month: "short", year: "numeric" });
  const grouped = active
    .filter((subscription) => !isOneTime(subscription) && subscription.renewalDate)
    .slice()
    .sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate))
    .reduce((months, subscription) => {
      const date = new Date(subscription.renewalDate);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!months[key]) {
        months[key] = {
          label: monthFormatter.format(date),
          items: [],
          total: 0,
        };
      }
      months[key].items.push(subscription);
      months[key].total += monthlyCost(subscription);
      return months;
    }, {});

  const months = Object.values(grouped).slice(0, 4);
  renewalCalendar.innerHTML = months.length
    ? months
        .map(
          (month) => `
            <article class="calendar-month">
              <div>
                <strong>${month.label}</strong>
                <small>${month.items.length} Erneuerung${month.items.length === 1 ? "" : "en"}</small>
              </div>
              <span>${formatCurrency(month.total)} mtl.</span>
              <ul>
                ${month.items
                  .slice(0, 3)
                  .map((subscription) => `<li>${escapeHtml(subscription.name)}<small>${formatDate(subscription.renewalDate)}</small></li>`)
                  .join("")}
              </ul>
            </article>
          `
        )
        .join("")
    : `<div class="detail-empty">Noch keine Erneuerungen eingetragen.</div>`;

  document.querySelectorAll(".deadline-item").forEach((button) => {
    button.addEventListener("click", () => {
      const subscription = subscriptions.find((item) => item.id === button.dataset.id);
      if (!subscription) return;
      selectedId = subscription.id;
      render();
      setRoute(routeForSubscription(subscription));
    });
  });
}

function selectedQuickCategory() {
  return quickCategory?.value || "Alle Kategorien";
}

function matchesQuickCategory(subscription) {
  const category = selectedQuickCategory();
  return category === "Alle Kategorien" || subscription.category === category;
}

function dashboardVisibleSubscriptions() {
  return subscriptions.filter((subscription) => !isArchived(subscription) && matchesCurrentSearch(subscription) && matchesQuickCategory(subscription));
}

function visibleSubscriptions() {
  const query = globalSearch.value.trim().toLowerCase();
  return subscriptions.filter((subscription) => {
    const searchableValues = [
      subscription.name,
      subscription.category,
      subscription.status,
      subscription.loginEmail,
      subscription.supportEmail,
      subscription.address,
      subscription.familyMember,
      subscription.contractNumber,
      subscription.notes,
      normalizeTags(subscription.tags).join(" "),
      ...(subscription.documents || []).map((document) => document.name),
    ];
    const matchesQuery = searchableValues.join(" ").toLowerCase().includes(query);
    const inRouteScope = currentRoute !== "subscriptions" || isCoreSubscription(subscription);
    const matchesFilter =
      (filterMode === "all" && !isCanceled(subscription)) ||
      (filterMode === "due" && isDueSoon(subscription)) ||
      (filterMode === "canceled" && isCanceledStillActive(subscription)) ||
      (filterMode === "family" && subscription.category === "Handy Familie") ||
      (filterMode === "policies" && subscription.category === "Police");
    return inRouteScope && !isArchived(subscription) && matchesQuery && matchesFilter && matchesQuickCategory(subscription);
  });
}

function matchesCurrentSearch(subscription) {
  const query = globalSearch.value.trim().toLowerCase();
  if (!query) return true;
  const searchableValues = [
    subscription.name,
    subscription.category,
    subscription.status,
    subscription.loginEmail,
    subscription.supportEmail,
    subscription.address,
    subscription.familyMember,
    subscription.contractNumber,
    subscription.notes,
    normalizeTags(subscription.tags).join(" "),
    ...(subscription.documents || []).map((document) => document.name),
  ];
  return searchableValues.join(" ").toLowerCase().includes(query);
}

function subscriptionRowMarkup(subscription, options = {}) {
  const dueSoon = isDueSoon(subscription);
  const selected = subscription.id === selectedId ? "selected" : "";
  const paused = subscription.status === "Pausiert";
  const canceled = isCanceled(subscription);
  const archived = isArchived(subscription);
  const compact = options.compact ? "compact-row" : "";
  return `
    <article class="subscription-row ${selected} ${compact} ${canceled ? "is-canceled" : ""} ${archived ? "is-archived" : ""} ${paused ? "is-paused" : ""}" data-id="${subscription.id}">
      <div class="subscription-main">
        <div class="subscription-title">
          <strong>${escapeHtml(subscription.name)}</strong>
          <span class="tag">${escapeHtml(subscription.category)}</span>
          ${archived ? `<span class="status-pill status-archived">Archiviert</span>` : canceled ? `<span class="status-pill status-canceled">Gekündigt</span>` : ""}
          ${dueSoon ? `<span class="risk">Frist</span>` : ""}
        </div>
        <div class="subscription-meta">
          <span>${displayStatus(subscription.status)}</span>
          <span>${archived ? "Beendet am" : subscription.noRenewal ? "Gültig bis" : "Erneuerung"} ${formatDate(archived ? effectiveEndDate(subscription) : subscription.noRenewal ? subscription.endDate : subscription.renewalDate)}</span>
          <span>${archived ? "Im Archiv" : subscription.noRenewal ? "Keine Erneuerung" : `Kündigen bis ${cancellationLabel(subscription)}`}</span>
          ${subscription.familyMember ? `<span>${escapeHtml(subscription.familyMember)}</span>` : ""}
        </div>
      </div>
      <div class="subscription-side">
        <span class="price">${formatCurrency(Number(subscription.amount || 0))}</span>
        <small>${intervalLabel(subscription.interval)}</small>
        <div class="subscription-actions" aria-label="Abo-Aktionen">
          ${dueSoon && !canceled ? `<button class="button warning row-action" type="button" data-action="deadline" data-id="${subscription.id}">Frist</button>` : ""}
          <button class="button subtle row-action" type="button" data-action="edit" data-id="${subscription.id}">Bearbeiten</button>
          ${
            canceled
              ? `<button class="button subtle row-action" type="button" data-action="activate" data-id="${subscription.id}">Wieder aktivieren</button>`
              : `<button class="button warning row-action" type="button" data-action="pause" data-id="${subscription.id}">${paused ? "Aktivieren" : "Pausieren"}</button>
                 <button class="button danger row-action" type="button" data-action="cancel" data-id="${subscription.id}">Gekündigt</button>`
          }
        </div>
      </div>
    </article>
  `;
}

function renderList() {
  const visible = visibleSubscriptions();
  subscriptionList.innerHTML = visible.length
    ? visible.map((subscription) => subscriptionRowMarkup(subscription)).join("")
    : `<div class="detail-empty">Keine passenden Abos gefunden.</div>`;

  const canceledActive = subscriptions.filter(
    (subscription) => isCoreSubscription(subscription) && isCanceledStillActive(subscription) && matchesCurrentSearch(subscription)
  );
  canceledActiveSection.classList.toggle("is-collapsed", filterMode !== "all" || !canceledActive.length);
  canceledActiveCount.textContent = String(canceledActive.length);
  canceledActiveList.innerHTML = canceledActive.length
    ? canceledActive.map((subscription) => subscriptionRowMarkup(subscription, { compact: true })).join("")
    : `<div class="detail-empty">Keine gekündigten, noch aktiven Abos.</div>`;

  document.querySelectorAll("#subscriptionList .subscription-row, #canceledActiveList .subscription-row").forEach((row) => {
    row.addEventListener("click", () => {
      selectedId = row.dataset.id;
      render();
    });
  });

  document.querySelectorAll("#subscriptionList .subscription-actions button, #canceledActiveList .subscription-actions button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const subscription = subscriptions.find((item) => item.id === button.dataset.id);
      if (!subscription) return;
      if (button.dataset.action === "edit") {
        selectedId = subscription.id;
        startEditing(subscription);
        renderDetail(false);
        return;
      }
      if (button.dataset.action === "deadline") {
        selectedId = subscription.id;
        render();
        setRoute("deadlines");
        return;
      }
      if (button.dataset.action === "pause") {
        const nextStatus = subscription.status === "Pausiert" ? "Aktiv" : "Pausiert";
        setSubscriptionStatus(subscription.id, nextStatus);
        showToast(nextStatus === "Pausiert" ? "Abo als pausiert markiert." : "Abo ist wieder aktiv.");
        return;
      }
      if (button.dataset.action === "activate") {
        setSubscriptionStatus(subscription.id, "Aktiv");
        showToast("Abo ist wieder aktiv.");
        return;
      }
      if (button.dataset.action === "cancel") {
        setSubscriptionStatus(subscription.id, "Gekuendigt");
        setFilterMode("canceled");
        showToast("Abo als gekündigt markiert.");
      }
    });
  });
}

function secretValue(value, revealed) {
  if (!value) return "Nicht hinterlegt";
  return revealed ? value : "••••";
}

function emptyValue(value) {
  return value ? escapeHtml(value) : `<span class="muted-value">Nicht hinterlegt</span>`;
}

function contactValue(subscription) {
  const parts = [
    subscription.supportEmail ? `<span class="contact-email">${escapeHtml(subscription.supportEmail)}</span>` : "",
    subscription.address ? `<span>${escapeHtml(subscription.address)}</span>` : "",
  ].filter(Boolean);
  return parts.length ? `<span class="contact-lines">${parts.join("")}</span>` : `<span class="muted-value">Nicht hinterlegt</span>`;
}

function detailRow(label, value) {
  return `<div class="detail-row"><span>${label}</span><strong>${value}</strong></div>`;
}

function detailSection(title, rows, extra = "") {
  return `
    <section class="detail-section">
      <h3>${title}</h3>
      <div class="detail-section-grid">${rows.join("")}</div>
      ${extra}
    </section>
  `;
}

function documentDetailMarkup(subscription) {
  const documents = subscription.documents || [];
  const uploadMarkup = `
    <div class="document-upload-inline">
      <span class="document-upload-count">${documents.length ? documentCountLabel(subscription) : "Keine PDFs"}</span>
      <label class="button subtle document-upload-button">
        PDF hinzufügen
        <input class="visually-hidden detail-document-upload" type="file" accept="application/pdf,.pdf" multiple />
      </label>
    </div>
  `;
  if (!documents.length) {
    return `
      <div class="document-list">
        <strong class="muted-value">Keine PDFs hinterlegt</strong>
        ${uploadMarkup}
      </div>
    `;
  }
  return `
    <div class="document-list">
      ${documents
        .map(
          (document) => `
            <div class="document-entry">
              <a class="document-link" href="${escapeHtml(document.dataUrl)}" download="${escapeHtml(document.name)}">
                <strong>${escapeHtml(document.name)}</strong>
                <small>${formatBytes(document.size)} · ${formatDate(document.uploadedAt)}</small>
              </a>
              <button class="button subtle document-analyze" type="button" data-document-id="${escapeHtml(document.id)}">PDF auslesen</button>
              <button class="button danger ghost-danger document-delete" type="button" data-document-id="${escapeHtml(document.id)}">PDF löschen</button>
            </div>
          `
        )
        .join("")}
      ${uploadMarkup}
    </div>
  `;
}

function detailMarkup(subscription, revealed = false, includeDocumentAnalysis = false) {
  const cancelBy = cancellationDate(subscription);
  const days = daysUntil(cancelBy);
  const canceled = isCanceled(subscription);
  const archived = isArchived(subscription);
  const dueSoon = isDueSoon(subscription);
  const oneTime = isOneTime(subscription);
  const type = subscription.category === "Police" ? "Police" : subscription.category === "Handy Familie" ? "Handy-Abo" : "Abo";
  const annualCost = monthlyCost(subscription) * 12;
  const familyContract = [subscription.familyMember, subscription.contractNumber].filter(Boolean).map(escapeHtml).join("<br />");
  const noticeLabel = oneTime ? "Keine Frist" : `${Number(subscription.noticeDays || 0)} Tage${dueSoon ? ` · ${deadlineLabel(days)}` : ""}`;

  const sections = [
    detailSection(
      "Kosten & Laufzeit",
      oneTime
        ? [
            detailRow("Total", `${formatCurrency(Number(subscription.amount || 0))} · einmalig`),
            detailRow("Laufende Monatskosten", formatCurrency(0)),
            detailRow("Beginn", formatDate(subscription.startDate)),
            detailRow("Bis", formatDate(subscription.endDate)),
          ]
        : [
            detailRow("Betrag", `${formatCurrency(Number(subscription.amount || 0))} · ${intervalLabel(subscription.interval)}`),
            detailRow("Monatlich gerechnet", formatCurrency(monthlyCost(subscription))),
            detailRow("Jährlich gerechnet", formatCurrency(annualCost)),
            detailRow("Beginn", formatDate(subscription.startDate)),
          ]
    ),
    ...(subscription.category === "Police"
      ? [
          detailSection("Gültigkeit", [
            detailRow("Von", formatDate(subscription.startDate)),
            detailRow("Bis", formatDate(subscription.endDate)),
            detailRow("Erneuerung", oneTime ? "Keine Erneuerung" : renewalLabel(subscription)),
          ]),
        ]
      : []),
    detailSection("Kündigung & Fristen", [
      detailRow("Kündigen bis", cancellationLabel(subscription)),
      detailRow("Erneuerung", renewalLabel(subscription)),
      detailRow("Kündigungsfrist", noticeLabel),
      detailRow("Status", displayStatus(subscription.status)),
    ]),
    detailSection("Anbieter & Kontakt", [
      detailRow(subscription.category === "Police" ? "Versicherer" : "Anbieter", emptyValue(subscription.name)),
      detailRow("Login-E-Mail", emptyValue(subscription.loginEmail)),
      detailRow("Support / Adresse", contactValue(subscription)),
    ]),
    detailSection(subscription.category === "Police" ? "Policendaten" : "Vertragsdaten", [
      detailRow(subscription.category === "Police" ? "Policennummer" : "Vertragsnummer", emptyValue(subscription.contractNumber)),
      detailRow("Kategorie", escapeHtml(subscription.category)),
      detailRow("Tags", tagMarkup(subscription.tags) || `<span class="muted-value">Keine Tags</span>`),
      detailRow("Familie / Zuordnung", familyContract || `<span class="muted-value">Nicht hinterlegt</span>`),
    ]),
    detailSection("Reminder", [
      detailRow("Datum", formatDate(subscription.reminderDate)),
      detailRow("Kanal", reminderChannelLabel(subscription.reminderChannel)),
    ]),
  ];

  if (subscription.category === "Handy Familie") {
    sections.push(
      detailSection("SIM / PIN / PUK", [
        detailRow("Familienmitglied", emptyValue(subscription.familyMember)),
        detailRow("PIN", escapeHtml(secretValue(subscription.pin, revealed))),
        detailRow("PUK", escapeHtml(secretValue(subscription.puk, revealed))),
      ])
    );
  }

  sections.push(detailSection("Dokumente", [], documentDetailMarkup(subscription)));

  if (includeDocumentAnalysis) {
    sections.push(renderDocumentAnalysisResult());
  }

  sections.push(
    detailSection("Notizen", [], `<p class="detail-note">${subscription.notes ? escapeHtml(subscription.notes).replaceAll("\n", "<br />") : "Keine Notizen hinterlegt."}</p>`)
  );

  return `
    <div class="detail-sheet">
      <div class="detail-hero ${dueSoon ? "is-due" : ""} ${canceled ? "is-canceled" : ""} ${archived ? "is-archived" : ""}">
        <div>
          <span class="mini-label">${type}</span>
          <h3>${escapeHtml(subscription.name)}</h3>
          <p>${archived ? `Archiviert · beendet am ${formatDate(effectiveEndDate(subscription))}` : oneTime ? `Einmalig · gültig bis ${formatDate(subscription.endDate)}` : dueSoon && !canceled ? `Kündigungsfenster: ${deadlineLabel(days)}` : `${displayStatus(subscription.status)} · ${documentCountLabel(subscription)}`}</p>
        </div>
        <div class="detail-hero-price">
          <strong>${formatCurrency(Number(subscription.amount || 0))}</strong>
          <span>${intervalLabel(subscription.interval)}</span>
        </div>
      </div>
      <div class="detail-kpis">
        <span><small>${oneTime ? "Von" : "Kündigen bis"}</small><strong>${oneTime ? formatDate(subscription.startDate) : cancellationLabel(subscription)}</strong></span>
        <span><small>${oneTime ? "Bis" : "Erneuerung"}</small><strong>${oneTime ? formatDate(subscription.endDate) : renewalLabel(subscription)}</strong></span>
        <span><small>${oneTime ? "Total" : "Monatlich"}</small><strong>${oneTime ? formatCurrency(Number(subscription.amount || 0)) : formatCurrency(monthlyCost(subscription))}</strong></span>
      </div>
      ${sections.join("")}
      <div class="detail-actions detail-actions-wide">
        <button class="button subtle" type="button" data-action="edit" data-id="${subscription.id}">Bearbeiten</button>
        <button class="button subtle" type="button" data-action="copy-cancel" data-id="${subscription.id}">Kündigungstext kopieren</button>
        <button class="button primary" type="button" data-action="send-cancel-email" data-id="${subscription.id}" ${!subscription.supportEmail ? "disabled" : ""}>Kündigung per E-Mail senden</button>
        ${
          subscription.category === "Handy Familie"
            ? `<button class="button subtle" type="button" data-action="reveal-secret" data-id="${subscription.id}" ${!subscription.pin && !subscription.puk ? "disabled" : ""}>${revealed ? "PIN/PUK ausblenden" : "PIN/PUK anzeigen"}</button>`
            : ""
        }
        ${
          canceled
            ? `<button class="button subtle" type="button" data-action="activate" data-id="${subscription.id}">Wieder aktivieren</button>`
            : `<button class="button warning" type="button" data-action="pause" data-id="${subscription.id}">${subscription.status === "Pausiert" ? "Als aktiv markieren" : "Als pausiert markieren"}</button>
               <button class="button danger" type="button" data-action="cancel" data-id="${subscription.id}">Als gekündigt markieren</button>`
        }
        <button class="button danger ghost-danger" type="button" data-action="delete" data-id="${subscription.id}">Löschen</button>
      </div>
    </div>
  `;
}

function bindDetailActions(container, subscription, renderRevealed) {
  container.querySelectorAll(".document-analyze").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      selectedId = subscription.id;
      analyzeDocument(button.dataset.documentId);
    });
  });

  container.querySelectorAll(".document-delete").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      selectedId = subscription.id;
      requestDeleteDocument(subscription.id, button.dataset.documentId);
    });
  });

  container.querySelector(".detail-document-upload")?.addEventListener("change", async (event) => {
    await addDocumentsToSubscription(subscription.id, event.target.files);
    event.target.value = "";
  });

  container.querySelector("#applyDocumentAnalysis")?.addEventListener("click", applyDocumentAnalysis);

  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const current = subscriptions.find((item) => item.id === button.dataset.id);
      if (!current) return;
      selectedId = current.id;
      if (button.dataset.action === "edit") {
        startEditing(current);
        return;
      }
      if (button.dataset.action === "copy-cancel") {
        navigator.clipboard?.writeText(cancellationText(current));
        showToast("Kündigungstext wurde kopiert.");
        return;
      }
      if (button.dataset.action === "send-cancel-email") {
        sendCancellationEmail(current);
        return;
      }
      if (button.dataset.action === "pause") {
        const nextStatus = current.status === "Pausiert" ? "Aktiv" : "Pausiert";
        setSubscriptionStatus(current.id, nextStatus);
        showToast(nextStatus === "Pausiert" ? "Abo als pausiert markiert." : "Abo ist wieder aktiv.");
        return;
      }
      if (button.dataset.action === "activate") {
        setSubscriptionStatus(current.id, "Aktiv");
        showToast("Abo ist wieder aktiv.");
        return;
      }
      if (button.dataset.action === "cancel") {
        setSubscriptionStatus(current.id, "Gekuendigt");
        if (currentRoute === "subscriptions" && isCoreSubscription(current)) {
          setFilterMode("canceled");
        }
        showToast("Abo als gekündigt markiert.");
        return;
      }
      if (button.dataset.action === "delete") {
        requestDeleteSubscription(current.id);
        return;
      }
      if (button.dataset.action === "reveal-secret") {
        if (renderRevealed && button.textContent.includes("ausblenden")) {
          renderRevealed(false);
          return;
        }
        pendingSecretId = current.id;
        pendingSecretRender = renderRevealed;
        masterPasswordInput.value = "";
        unlockDialog.showModal();
        masterPasswordInput.focus();
      }
    });
  });
}

function renderDetail(revealed = false) {
  const subscription = subscriptions.find((item) => item.id === selectedId);
  const title = document.querySelector("#detailTitle");
  const status = document.querySelector("#detailStatus");
  const content = document.querySelector("#detailContent");

  if (!subscription || (currentRoute === "subscriptions" && (!isCoreSubscription(subscription) || isArchived(subscription)))) {
    title.textContent = "Abo auswählen";
    status.textContent = "-";
    status.className = "status-pill";
    content.className = "detail-empty";
    content.textContent = "Wähle ein Abo aus der Liste oder lege ein neues an.";
    return;
  }

  title.textContent = subscription.name;
  status.textContent = displayStatus(subscription.status);
  status.className = `status-pill ${statusClass(subscription.status)}`;
  content.className = "detail-content";
  content.innerHTML = detailMarkup(subscription, revealed, true);
  bindDetailActions(content, subscription, renderDetail);
}

function overviewCard(subscription) {
  const dueSoon = isDueSoon(subscription);
  const canceled = isCanceled(subscription);
  const archived = isArchived(subscription);
  const oneTime = isOneTime(subscription);
  const costLabel = oneTime ? `${formatCurrency(Number(subscription.amount || 0))} einmalig` : `${formatCurrency(monthlyCost(subscription))} monatlich`;
  return `
    <article class="compact-item overview-card ${subscription.id === selectedId ? "selected" : ""} ${canceled ? "is-canceled" : ""} ${archived ? "is-archived" : ""}" data-id="${subscription.id}" tabindex="0">
      <div class="overview-card-head">
        <strong>${escapeHtml(subscription.familyMember || subscription.name)}</strong>
        <span class="status-pill ${archived ? "status-archived" : statusClass(subscription.status)}">${archived ? "Archiviert" : displayStatus(subscription.status)}</span>
      </div>
      <small>${escapeHtml(subscription.name)} · ${costLabel}${archived ? ` · beendet am ${formatDate(effectiveEndDate(subscription))}` : oneTime ? ` · gültig bis ${formatDate(subscription.endDate)}` : ""}</small>
        <div class="overview-tags">
          <span class="tag">${escapeHtml(subscription.category)}</span>
          ${tagMarkup(subscription.tags)}
          ${archived ? `<span class="tag">Archiv</span>` : ""}
          ${oneTime ? `<span class="tag">Einmalig</span>` : ""}
        ${dueSoon ? `<span class="risk">Frist</span>` : ""}
        <span class="tag">${documentCountLabel(subscription)}</span>
        ${subscription.contractNumber ? `<span class="tag">${escapeHtml(subscription.contractNumber.slice(0, 28))}</span>` : ""}
      </div>
      <div class="subscription-actions">
        <button class="button subtle row-action" type="button" data-action="details" data-id="${subscription.id}">Details</button>
        <button class="button subtle row-action" type="button" data-action="edit" data-id="${subscription.id}">Bearbeiten</button>
      </div>
    </article>
  `;
}

function overviewDetail(subscription, emptyText, revealed = false) {
  if (!subscription) return `<div class="detail-empty">${emptyText}</div>`;
  return detailMarkup(subscription, revealed, true);
}

function bindOverviewActions(container) {
  container.querySelectorAll(".overview-card").forEach((card) => {
    const select = () => {
      selectedId = card.dataset.id;
      render();
    };
    card.addEventListener("click", select);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        select();
      }
    });
  });

  container.querySelectorAll(".overview-card [data-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const subscription = subscriptions.find((item) => item.id === button.dataset.id);
      if (!subscription) return;
      selectedId = subscription.id;
      if (button.dataset.action === "edit") {
        startEditing(subscription);
        return;
      }
      if (button.dataset.action === "details") {
        render();
      }
    });
  });
}

function renderInsights() {
  const family = subscriptions.filter((subscription) => subscription.category === "Handy Familie" && !isArchived(subscription));
  const selectedFamily = family.find((subscription) => subscription.id === selectedId) || family[0];
  familyOverview.innerHTML = family.length ? family.map(overviewCard).join("") : `<div class="detail-empty">Noch keine Familien-Handy-Abos hinterlegt.</div>`;
  familyDetailSummary.className = "overview-detail";
  const renderFamilyDetail = (revealed = false) => {
    familyDetailSummary.innerHTML = overviewDetail(selectedFamily, "Wähle ein Handy-Abo aus.", revealed);
    if (selectedFamily) bindDetailActions(familyDetailSummary, selectedFamily, renderFamilyDetail);
  };
  renderFamilyDetail(false);
  bindOverviewActions(familyOverview);
  bindOverviewActions(familyDetailSummary);

  const policies = subscriptions.filter((subscription) => subscription.category === "Police" && !isArchived(subscription));
  const selectedPolicy = policies.find((subscription) => subscription.id === selectedId) || policies[0];
  policyOverview.innerHTML = policies.length ? policies.map(overviewCard).join("") : `<div class="detail-empty">Noch keine Policen aufgenommen.</div>`;
  policyDetailSummary.className = "overview-detail";
  policyDetailSummary.innerHTML = overviewDetail(selectedPolicy, "Wähle eine Police aus.");
  bindOverviewActions(policyOverview);
  bindOverviewActions(policyDetailSummary);
  if (selectedPolicy) bindDetailActions(policyDetailSummary, selectedPolicy, () => renderInsights());

  const protectedCount = subscriptions.filter((subscription) => subscription.pin || subscription.puk).length;
  securitySummary.innerHTML = `
    <div class="compact-item">
      <strong>${protectedCount} geschützte Datensätze</strong>
      <small>PIN/PUK bleiben maskiert, werden nicht in der Suche berücksichtigt und sind nur kurz nach Passwort-Freigabe sichtbar.</small>
    </div>
    <div class="compact-item">
      <strong>Später serverseitig verschlüsseln</strong>
      <small>Für SaaS-Betrieb gehören diese Daten in ein Backend mit Rollen, Audit-Log und Verschlüsselung.</small>
    </div>
  `;

  adminSummary.innerHTML = `
    <div class="compact-item">
      <strong>1. Datenmodell finalisiert</strong>
      <small>Abo, Handy-Vertrag, Police, Dokument, Kontakt und Reminder sind als Zielmodell dokumentiert.</small>
    </div>
    <div class="compact-item">
      <strong>2. React/Next.js-Entscheid</strong>
      <small>MVP bleibt statisch; Migration zu Next.js startet erst mit Auth, Backend und Datenbank.</small>
    </div>
    <div class="compact-item">
      <strong>3. Dokumenten-Storage geplant</strong>
      <small>PDFs wandern später aus localStorage in Objekt-Storage mit Metadaten in Postgres.</small>
    </div>
    <div class="compact-item">
      <strong>4. Tags & Reminder angelegt</strong>
      <small>Einträge haben strukturierte Tags, Reminder-Datum und Zielkanal als vorbereitete Felder.</small>
    </div>
    <div class="compact-item">
      <strong>5. Backend-Architektur definiert</strong>
      <small>API, Postgres, Jobs, Verschlüsselung, Audit-Log und Analyse-Service sind abgegrenzt.</small>
    </div>
    <div class="compact-item">
      <strong>6. GitHub & Deploy vorbereitet</strong>
      <small>Repo- und VPS-Schritte sind dokumentiert; Push und Deployment bleiben bewusst manuell.</small>
    </div>
  `;
}

function renderArchive() {
  const archived = subscriptions.filter((subscription) => isArchived(subscription) && matchesCurrentSearch(subscription));
  const selectedArchive = archived.find((subscription) => subscription.id === selectedId) || archived[0];
  archiveCount.textContent = String(archived.length);
  archiveOverview.innerHTML = archived.length
    ? archived
        .slice()
        .sort((a, b) => new Date(effectiveEndDate(b)) - new Date(effectiveEndDate(a)))
        .map(overviewCard)
        .join("")
    : `<div class="detail-empty">Noch keine beendeten Verträge im Archiv.</div>`;
  archiveDetailSummary.className = "overview-detail";
  archiveDetailSummary.innerHTML = overviewDetail(selectedArchive, "Wähle einen archivierten Eintrag aus.");
  bindOverviewActions(archiveOverview);
  bindOverviewActions(archiveDetailSummary);
  if (selectedArchive) bindDetailActions(archiveDetailSummary, selectedArchive, () => renderArchive());
}

function render() {
  const dashboardItems = dashboardVisibleSubscriptions();
  renderMetrics(dashboardItems);
  renderDeadlines(dashboardItems);
  renderList();
  renderDetail(false);
  renderInsights();
  renderArchive();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const wasEditing = Boolean(editingId);
  if (wasEditing) {
    const index = subscriptions.findIndex((subscription) => subscription.id === editingId);
    if (index >= 0) {
      const subscription = await subscriptionFromFormWithDocuments(editingId);
      if (!subscription) return;
      subscriptions[index] = subscription;
      selectedId = editingId;
    }
  } else {
    const subscription = await subscriptionFromFormWithDocuments();
    if (!subscription) return;
    subscriptions.unshift(subscription);
    selectedId = subscription.id;
  }
  if (!save()) return;
  resetEditor();
  editorDialog.close();
  render();
  showToast(wasEditing ? "Änderungen gespeichert." : "Abo gespeichert.");
});

providerSearch.addEventListener("change", () => {
  if (!applyPresetByName(providerSearch.value)) {
    const nameInput = field("name");
    const originalProviderValue = providerSearch.dataset.originalValue || "";
    if (!nameInput.value.trim() || nameInput.value.trim() === originalProviderValue) {
      nameInput.value = providerSearch.value.trim();
    }
  }
});

commandProviderSearch.addEventListener("change", () => {
  applyPresetByName(commandProviderSearch.value, true);
});

commandProviderSearch.addEventListener("input", () => {
  applyPresetByName(commandProviderSearch.value);
});

document.querySelector("#resetForm").addEventListener("click", () => {
  resetEditor();
});

document.querySelector("#closeEditor").addEventListener("click", () => {
  resetEditor();
  editorDialog.close();
});

document.querySelector("#addSubscription").addEventListener("click", (event) => {
  event.preventDefault();
  setRoute("subscriptions");
  openEditor(null, "");
});

document.querySelector("#addCoreSubscription").addEventListener("click", () => {
  openEditor(null, "");
});

document.querySelector("#runAnalysis").addEventListener("click", runAnalysis);
document.querySelector("#refreshAnalysis").addEventListener("click", runAnalysis);

document.querySelector("#addPhoneSubscription").addEventListener("click", () => {
  openEditor(null, "Handy Familie");
});

document.querySelector("#addPolicySubscription").addEventListener("click", () => {
  openEditor(null, "Police");
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    setFilterMode(button.dataset.filter);
  });
});

document.querySelectorAll("[data-route]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (link.id === "addSubscription") return;
    setRoute(link.dataset.route);
  });
});

window.addEventListener("hashchange", () => {
  setRoute(routeFromHash(), false);
});

globalSearch.addEventListener("input", () => {
  render();
});
quickCategory.addEventListener("change", () => {
  renderPresets();
  render();
});
field("category").addEventListener("change", () => {
  toggleFamilyFields();
  toggleRenewalFields();
});
field("interval").addEventListener("change", toggleRenewalFields);
field("noRenewal").addEventListener("change", toggleRenewalFields);
field("status").addEventListener("change", toggleRenewalFields);

document.querySelector("#themeToggle").addEventListener("click", toggleTheme);
document.querySelector("#sidebarThemeToggle").addEventListener("click", toggleTheme);

avatarUpload.addEventListener("change", async () => {
  const file = avatarUpload.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Bitte eine Bilddatei wählen.");
    avatarUpload.value = "";
    return;
  }
  if (file.size > 700 * 1024) {
    showToast("Avatar ist zu gross. Bitte unter 700 KB wählen.");
    avatarUpload.value = "";
    return;
  }
  const dataUrl = await readFileAsDataUrl(file);
  localStorage.setItem(avatarKey, dataUrl);
  setAvatar(dataUrl);
  avatarUpload.value = "";
  showToast("Avatar gespeichert.");
});

document.querySelector("#unlockConfirm").addEventListener("click", (event) => {
  event.preventDefault();
  if (masterPasswordInput.value !== masterPassword) {
    showToast("Passwort stimmt nicht.");
    masterPasswordInput.select();
    return;
  }
  unlockDialog.close();
  selectedId = pendingSecretId;
  const renderSecret = pendingSecretRender || renderDetail;
  renderSecret(true);
  window.setTimeout(() => renderSecret(false), 12000);
});

document.querySelector("#deleteCancel").addEventListener("click", () => {
  pendingDeleteId = "";
  pendingDeleteDocumentId = "";
});

document.querySelector("#deleteConfirm").addEventListener("click", (event) => {
  event.preventDefault();
  deleteDialog.close();
  if (pendingDeleteDocumentId) {
    deleteDocument(pendingDeleteId, pendingDeleteDocumentId);
  } else {
    deleteSubscription(pendingDeleteId);
  }
  pendingDeleteId = "";
  pendingDeleteDocumentId = "";
});

load();
renderPresets();
toggleFamilyFields();
toggleRenewalFields();
render();
setRoute(routeFromHash(), false);
