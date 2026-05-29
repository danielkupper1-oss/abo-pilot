# Abo Pilot - Chat Handoff

Diese Datei fasst den aktuellen Stand zusammen, damit in einem neuen Chat nahtlos weitergearbeitet werden kann.

## Projekt

Wir bauen eine neue, unabhaengige App namens **Abo Pilot** unter:

```text
/Users/daniel/Documents/Abo Pilot
```

Ziel: Eine moderne, spaeter SaaS-faehige Anwendung zur Verwaltung von normalen Abos, Handy-Vertraegen, Policen, Magazinen, Zeitungen, Online-Abos und Familien-Handy-Abos.

Die alte Vereinsapp im `Habits`-Ordner bleibt unangetastet. Die fruehere Abo-Pilot-Kopie unter `/Users/daniel/Documents/Habits/abo-pilot` wurde nach `/Users/daniel/Documents/Abo Pilot` migriert und entfernt.

## Aktueller Stand

- Statische MVP-App mit `index.html`, `styles.css`, `app.js`.
- Daten liegen aktuell im Browser-`localStorage`.
- Lokaler Server:

```bash
python3 -m http.server 8080
```

- Lokale URL:

```text
http://localhost:8080
```

- Lokaler Git-Commit existiert:

```text
576f6eb Initial Abo Pilot MVP
```

- Es wurde nicht zu GitHub gepusht.
- Kein Remote ist eingerichtet.
- Gewuenschtes spaeteres GitHub-Ziel:

```text
https://github.com/danielkupper1-oss/abo-pilot
```

- Der User moechte vorerst lokal weiterarbeiten.
- Aktueller Worktree ist dirty. Zuletzt aktiv bearbeitet: `app.js`, `index.html`, `styles.css`, `analysis-server.js`, `README.md`, `DEPLOYMENT.md`, Docker/Nginx-Dateien und `CHAT_HANDOFF.md`.

## Navigationsstruktur

Die App wurde zuletzt klarer getrennt:

- `Dashboard`: Kennzahlen, haeufige Anbieter, Fristen- und Erneuerungsuebersicht.
- `Abos`: nur normale Abos wie Streaming, Software, Zeitung, Magazin, Online-Abo, Cloud, Sonstiges.
- `Handy`: eigene Seite fuer Handy-/SIM-Vertraege und Familien-Handy-Abos.
- `Fristen`: uebergreifende Fristen-Zentrale.
- `Policen`: eigene Seite fuer Versicherungen und Policen.
- `Archiv`: beendete/gekuendigte Vertraege, deren Enddatum in der Vergangenheit liegt.
- `Sicherheit`: sensible Daten und SaaS-Sicherheitsnotizen.
- `SaaS Admin`: Ausbaupfad fuer Mandanten, Rollen, Reminder und Datenschutz.

Wichtig: Policen und Handy-Vertraege sollen **nicht** mehr unter `Abos` erscheinen. `Abos` ist bewusst auf normale Abos beschraenkt.

## Umgesetzte Funktionen

- Dashboard mit Monatskosten, Jahreskosten, Handlungsfristen und Familien-Handy-Abos.
- Getrennte Bereiche fuer normale Abos, Handy-Vertraege, Policen und Archiv.
- Normale Abos zeigen aktive Eintraege getrennt von `Gekuendigt, aber noch aktiv bis Enddatum`.
- Archiv wird abgeleitet: Status `Gekuendigt` plus `endDate`/Erneuerungsdatum in der Vergangenheit.
- Archivierte Eintraege verschwinden aus aktiven Listen und erscheinen unter `Archiv`.
- Bearbeiten und Anlegen laufen jetzt ueber ein Modal/Dialog-Fenster:
  - `Abo hinzufuegen`
  - `Handy hinzufuegen`
  - `Police hinzufuegen`
  - `Bearbeiten` aus Abos, Handy und Policen
- Abo-/Vertrags-Erfassung mit:
  - Anbieter
  - Kategorie
  - Kosten
  - Intervall
  - Startdatum
  - Erneuerung
  - Bis-/Enddatum
  - Kuendigungsfrist
  - Status
  - Login-E-Mail
  - Anbieter-E-Mail
  - Adresse/Kontakt
  - Familienmitglied
  - SIM-/Vertragsnummer
  - PIN
  - PUK
  - Notizen
  - PDF-Dokumente
- Bei normalen Abos erscheint `Bis-/Enddatum`, sobald der Status auf `Gekuendigt` gesetzt wird.
- Bei Policen gibt es zusaetzlich `Keine Erneuerung / einmalige Police`.
- Einmalige Policen haben `Von/Bis`, keine Erneuerung und erscheinen nicht in Kuendigungsagenda/Erneuerungskalender.
- PDF-Upload pro Abo/Police:
  - `<input type="file" accept="application/pdf,.pdf" multiple>`
  - PDFs werden im statischen MVP lokal im Browser gespeichert.
  - Limit aktuell: 1.5 MB pro PDF, damit `localStorage` nicht sofort volllaeuft.
  - Detailansicht zeigt PDF-Liste mit Download-Link.
- PDF-Auslesen:
  - Button `PDF auslesen` ist in den Detailansichten verdrahtet.
  - Fuer echtes Auslesen muss der Analyse-Service unter `/api/analyze-document` laufen.
  - Wenn nur der statische Server laeuft, zeigt die App eine verstaendliche Fehlermeldung statt scheinbar nichts zu tun.
- Anbieter-Vorauswahl mit Logos fuer bekannte Anbieter, u. a.:
  Netflix, Spotify Family, NZZ Digital, Swisscom Mobile, Sunrise Mobile, Apple iCloud+, Microsoft 365 Family, Disney+, Adobe, Hostinger, Apple TV+, AXA.
- PIN/PUK werden maskiert angezeigt.
- Anzeige sensibler Daten erst nach Master-Passwort.
- Demo-Passwort:

```text
pilot
```

- Kuendigungstext-Generator.
- Loeschfunktion mit Sicherheitsdialog (`Endgueltig loeschen`).
- Statusoptionen:
  - `Aktiv`
  - `Probeabo`
  - `Gekuendigt`
  - `Pausiert`
- `Pausiert` ist als Status eingebaut; pausierte und gekuendigte Abos werden nicht mehr in die laufenden Monatskosten eingerechnet.
- `Wieder aktivieren` ist fuer gekuendigte Eintraege vorhanden.
- Fristen-Zentrale mit sortierter Kuendigungsagenda und Erneuerungskalender.
- Ueberfaellige Kuendigungsfristen zaehlen als Handlungsbedarf.
- Responsive Desktop- und Mobile-Ansicht.
- Avatar-Upload oben links im Brand-Bereich:
  - Bild wird als Data-URL in `localStorage` gespeichert (`abo-pilot-avatar`).
  - Limit aktuell 700 KB.
- Hell/Dunkel-Schalter:
  - Desktop: weiterhin in der Topbar.
  - Mobile: zusaetzlich im linken Brand/Header-Bereich sichtbar; Topbar-Button wird mobil ausgeblendet.

## Importierte Abos und Policen

Aus Gmail und Dokumenten wurden Startdaten importiert bzw. als Kandidaten angelegt:

### Normale Abos

- Hostinger KVM 2 VPS + Daily Backup
- LFI Print-Abo
- yallo Home Supermax Cable + TV
- Disney+ Standard
- Adobe Foto-Abo 20 GB
- A Better Routeplanner (ABRP)
- Apple TV+
- Flightradar24 Gold Plan
- Netflix, Status `Pausiert`
- ChatGPT Plus, Status `Gekuendigt`
- ABRP kann als zurueckliegend gekuendigt gespeichert werden, indem Status `Gekuendigt` plus `Bis-/Enddatum` gesetzt wird, z. B. `31.08.2025`. Danach landet es im Archiv.

### Handy

- Sunrise Swiss Travel
- Swisscom blue Mobile M, Status `Gekuendigt`
- Swisscom blue Mobile M ist wegen Enddatum 30.01.2026 im Archiv sichtbar, wenn dieses Datum in der Vergangenheit liegt.

### Policen

- CSS Reiseversicherung
- CSS Krankenversicherung Daniel
- CSS Krankenversicherung Lars
- CSS Krankenversicherung Amelie
- CSS Krankenversicherung Aline
- AXA Police Daniel
- Zurich / KDG MF Kupper

Viele Betrage, Policennummern und genaue Laufzeiten sind Platzhalter bzw. muessen durch den User ergaenzt werden.

## UI/UX und Design

Das Design wurde von sehr fancy auf kompakteres **Swiss Utility** umgestellt.

Aktuelles Farbschema:

```text
Background: #f7f8f6
Surface:    #ffffff
Soft:       #eef5f2
Ink:        #1f2933
Muted:      #66756f
Line:       #d9e0dc
Teal:       #0f766e
Sidebar:    #7bb8e3
Navy:       #102536
Amber:      #b45309
Red:        #b42318
```

Button-Konzept:

- Teal/Gruen: primaere Aktionen.
- Grau/Soft: neutrale Aktionen wie `Bearbeiten`.
- Orange/Amber: Frist, Pausieren/Aktivieren, Handlungsbedarf.
- Rot: destruktiv bzw. Status `Gekuendigt`.

UI wurde kompakter gemacht:

- kleinere Kacheln
- kleinere Buttons
- geringere Abstaende
- eigener Detailbereich je Arbeitsbereich
- neue strukturierte Detailansichten mit Summary-Kopf, KPI-Zeile und Abschnitten:
  - Kosten & Laufzeit
  - Kuendigung & Fristen
  - Anbieter & Kontakt
  - Vertragsdaten/Policendaten
  - Dokumente
  - Notizen
- Kontaktangaben werden als getrennte Zeilen dargestellt, damit E-Mail und Adresse nicht unguenstig mitten im Text zusammenbrechen.
- Anbieter-Logos in Provider-Chips/Karten
- keine grossen Hero-Titel

## Projektdateien

```text
index.html
styles.css
app.js
README.md
SAAS_PLAN.md
DEPLOYMENT.md
Dockerfile
docker-compose.yml
nginx.conf
.gitignore
CHAT_HANDOFF.md
```

## SaaS- und Deployment-Vorbereitung

- `README.md` beschreibt MVP, lokale Nutzung und Roadmap.
- `SAAS_PLAN.md` enthaelt SaaS-Richtung:
  Authentifizierung, Mandanten/Haushalte, Rollen, Postgres, verschluesselte PIN/PUK, Reminder, Dokumente, Stripe, Admin, Datenschutz/Export/Loeschung.
- `DEPLOYMENT.md` beschreibt Hostinger-VPS-Deployment mit Docker und Nginx.
- Docker-Dateien sind vorhanden, aber Docker wurde lokal nicht getestet, weil `docker` nicht verfuegbar war.

## Validierung

Letzte wichtige Checks:

- `node --check app.js` erfolgreich.
- `node --check analysis-server.js` erfolgreich.
- Browser-QA im Codex In-App Browser erfolgreich:
  - `#subscriptions`: normale Abos sichtbar, keine Policen und keine Handy-Vertraege.
  - `#subscriptions`: aktive normale Abos und gekuendigte, noch aktive Abos getrennt sichtbar.
  - `#archive`: archivierte/beendete Vertraege sichtbar, Details rendern.
  - `#policies`: 7 Policen sichtbar, klickbare Karten, Detailpanel vorhanden.
  - `#family`: als `Handy` sichtbar, 2 Handy-Vertraege, Detailpanel vorhanden.
  - Bearbeiten aus `Abos`, `Handy` und `Policen` oeffnet Modal/Dialog.
  - Hinzufuegen-Buttons oeffnen Dialog mit passender Kategorie:
    - normales Abo
    - Handy Familie
    - Police
  - PDF-Upload-Feld ist vorhanden.
  - Dokumentbereich erscheint in der Detailansicht.
  - Einmalige Police mit `Keine Erneuerung` wurde temporaer erstellt, Detailansicht geprueft und wieder geloescht.
  - Workflow-Test: Test-Abo anlegen, kuendigen, als gekuendigt markieren, loeschen.
  - Mobile QA:
    - Archiv-Navigation sichtbar.
    - Archivansicht ohne horizontales Ueberlaufen.
    - Avatar sichtbar.
    - Mobile Hell/Dunkel-Schalter im Brand-Bereich sichtbar.
  - Keine Console-Warnungen/Fehler.

Hinweis: Screenshot-Capture im In-App-Browser lief mehrfach teilweise in Timeouts; DOM-/Browser-State-QA war erfolgreich. Gespeicherte QA-Screenshots lagen zeitweise unter `/private/tmp/abo-pilot-qa-*.png`.

## Wichtige technische Hinweise

Aktuell ist Abo Pilot ein statischer Frontend-MVP mit `localStorage`.

Das bedeutet:

- PDF-Dateien werden als Data-URLs im Browser gespeichert.
- Avatar-Bild wird ebenfalls als Data-URL im Browser gespeichert.
- Das ist nur fuer kleine Tests geeignet.
- Fuer echte Nutzung braucht es spaeter einen Datei-Speicher, z. B. S3-kompatibler Storage, Supabase Storage oder serverseitige Ablage.
- Sensible Daten wie PIN/PUK duerfen fuer echte SaaS-Nutzung nicht im Klartext im Browser gespeichert werden.

Fuer echte SaaS-Nutzung braucht es spaeter:

- Backend
- Authentifizierung
- Datenbank
- serverseitige Verschluesselung fuer PIN/PUK
- Datei-/Dokumentenspeicher
- Zahlungsintegration
- rechtliche Seiten
- Backups und Monitoring

## Sinnvolle naechste Schritte

1. Datenmodell finalisieren: Abo, Handy-Vertrag, Police, Dokument, Kontakt, Reminder.
2. Entscheiden, ob Umstieg auf React/Next.js gemacht wird.
3. Dokumenten-Handling aus `localStorage` in echten Storage verschieben.
4. Tags/Status/Fristen als eigene strukturierte Felder ausbauen.
5. Backend-Architektur definieren.
6. Danach GitHub-Repo erstellen und deployen.
