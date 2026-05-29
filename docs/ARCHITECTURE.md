# Abo Pilot Architektur

Stand: 2026-05-29

## Entscheidung

Der aktuelle MVP bleibt vorerst eine statische App mit `localStorage`. Der Umstieg auf React/Next.js ist sinnvoll, sobald Authentifizierung, Datenbank, Storage und Reminder-Worker gemeinsam umgesetzt werden.

## Zielbild

- Frontend: Next.js mit serverseitiger Auth-Integration und responsiver App-Oberflaeche.
- API: Node.js/TypeScript, entweder Next.js Route Handlers oder separater API-Service.
- Datenbank: Postgres.
- Storage: S3-kompatibler Objekt-Storage fuer PDFs und Avatar-Dateien.
- Analyse: eigener interner Analyse-Service fuer PDF-Extraktion und optionale lokale KI.
- Jobs: Worker fuer Erinnerungen, Exporte, Dokumentenanalyse und Cleanup.
- Payments: Stripe Checkout und Customer Portal.
- Betrieb: Docker Compose auf VPS, spaeter managed Postgres und Storage.

## Services

### web

Rendert die App, verwaltet Sessions, ruft API-Endpunkte auf und zeigt keine Geheimnisse ohne explizite Freigabe an.

### api

Verwaltet Haushalte, Vertraege, Dokument-Metadaten, Kontakte, Reminder, Audit-Log und SaaS-Abos.

### analysis

Interner Service fuer:

- PDF-Text-Extraktion
- heuristische Felderkennung
- optionale Ollama-Zusammenfassung
- Rueckgabe strukturierter Vorschlaege an die App

Der Browser ruft nie Ollama direkt auf.

### worker

Fuehrt zeitgesteuerte Aufgaben aus:

- Reminder senden
- Kalender-Events erzeugen
- Dokumentenanalyse nach Upload
- Export-Jobs
- Aufbewahrungs- und Loeschprozesse

## API-Schnittstellen

Erste SaaS-API:

- `GET /api/contracts`
- `POST /api/contracts`
- `GET /api/contracts/:id`
- `PATCH /api/contracts/:id`
- `DELETE /api/contracts/:id`
- `POST /api/contracts/:id/documents`
- `POST /api/documents/:id/analyze`
- `GET /api/reminders`
- `POST /api/reminders`
- `PATCH /api/reminders/:id`
- `POST /api/secrets/:id/reveal`
- `GET /api/export`

## Sicherheitsregeln

- PIN/PUK werden nie als normale Vertragsfelder gespeichert.
- Geheimnisse werden serverseitig verschluesselt und nur kurzzeitig entschluesselt.
- Jede Anzeige sensibler Daten schreibt ins Audit-Log.
- Dokumente werden per signierter URL ausgeliefert.
- API-Antworten fuer Listen enthalten keine Geheimnisse.
- Analyse-Prompts enthalten keine PIN, PUK oder Passwoerter.

## Deployment-Stufen

### Stufe 1: Lokaler MVP

- Statisches Frontend
- `localStorage`
- optionaler Analyse-Service

### Stufe 2: VPS Pilot

- Docker Compose
- Nginx Reverse Proxy
- API, Postgres, Storage-Minimum
- manuelle Backups

### Stufe 3: SaaS

- Auth
- Stripe
- Rollen und Haushalte
- automatisierte Backups
- Monitoring
- Datenschutz-Export und Loeschung
