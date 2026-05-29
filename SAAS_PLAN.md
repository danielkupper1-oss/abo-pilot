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

- Frontend: React oder Next.js
- Backend: Node.js/TypeScript API
- Datenbank: Postgres
- Auth: E-Mail/Login, OAuth optional
- Secrets: verschluesselte Spalten fuer PIN/PUK, getrennte Schluesselverwaltung
- Jobs: Reminder-Worker fuer E-Mail und Kalender
- Payments: Stripe Checkout und Customer Portal
- Deployment: Docker Compose auf VPS, spaeter managed Postgres und Objekt-Storage

## Datenmodell MVP

- `users`
- `households`
- `household_members`
- `subscriptions`
- `providers`
- `renewal_events`
- `documents`
- `secret_values`
- `audit_log`
- `billing_customers`

## Wichtig fuer zahlende Kunden

- Datenschutz und Datenexport ab Tag 1
- Backups und Restore-Test
- Rollen fuer Familien: Besitzer, Verwalter, Nur-Lesen
- Audit-Log fuer sensible Aktionen wie PIN anzeigen
- Keine PIN/PUK im Klartext in Logs, Browser-Konsole oder API-Antworten ohne explizite Freigabe
