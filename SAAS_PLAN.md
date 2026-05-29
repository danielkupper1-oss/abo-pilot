# SaaS-Plan fuer Abo Pilot

## Zielgruppe

- Privathaushalte und Familien
- Personen mit vielen digitalen Abos
- Nutzer mit Zeitungen, Magazinen, Vereinen, Software und Handyvertraegen
- Spaeter: kleine Firmen, die wiederkehrende Tools und Lizenzen verwalten

## Kernversprechen

Abo Pilot verhindert vergessene Kuendigungen, macht Kosten transparent und sammelt alle wichtigen Vertragsdaten an einem Ort.

## Moegliche Plaene

### Free

- bis 5 Abos
- lokale Erinnerungsansicht
- einfache Kostenuebersicht

### Family

- unbegrenzte Abos
- mehrere Familienmitglieder
- Handy-PIN/PUK-Tresor
- E-Mail-Erinnerungen
- Dokumentenablage

### Plus

- Kalenderexport
- Preisverlaufslog
- CSV-Import/Export
- Kuendigungsvorlagen
- Prioritaets-Support

## Technische Zielarchitektur

- Frontend: aktueller MVP statisch, spaeter Next.js beim Start von Auth/API/Postgres
- Backend: Node.js/TypeScript API
- Datenbank: Postgres
- Auth: E-Mail/Login, OAuth optional
- Secrets: verschluesselte Spalten fuer PIN/PUK, getrennte Schluesselverwaltung
- Jobs: Reminder-Worker fuer E-Mail und Kalender
- Payments: Stripe Checkout und Customer Portal
- Deployment: Docker Compose auf VPS, spaeter managed Postgres und Objekt-Storage

## Datenmodell MVP

Das Zielmodell ist in [docs/DATA_MODEL.md](docs/DATA_MODEL.md) konkretisiert. Kernobjekte:

- `users`
- `households`
- `household_members`
- `contracts`
- `mobile_contract_details`
- `policy_details`
- `providers`
- `contacts`
- `documents`
- `reminders`
- `secret_values`
- `audit_log`
- `billing_customers`

## Umgesetzte Handoff-Schritte

1. Datenmodell finalisiert: siehe `docs/DATA_MODEL.md`.
2. React/Next.js-Entscheid: MVP bleibt statisch, Migration mit Backend-Start.
3. Dokumenten-Handling: Zielablauf in `docs/DOCUMENT_STORAGE.md`.
4. Tags/Status/Fristen: Tags, Reminder-Datum und Reminder-Kanal sind im MVP erfasst; Status und Fristen bleiben strukturierte Felder.
5. Backend-Architektur: siehe `docs/ARCHITECTURE.md`.
6. GitHub und Deployment: vorbereitet in `docs/GITHUB_DEPLOYMENT_CHECKLIST.md`, Ausfuehrung nach Freigabe.

## Wichtig fuer zahlende Kunden

- Datenschutz und Datenexport ab Tag 1
- Backups und Restore-Test
- Rollen fuer Familien: Besitzer, Verwalter, Nur-Lesen
- Audit-Log fuer sensible Aktionen wie PIN anzeigen
- Keine PIN/PUK im Klartext in Logs, Browser-Konsole oder API-Antworten ohne explizite Freigabe
