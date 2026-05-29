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

- Lokale Git-Commits existieren:

```text
576f6eb Initial Abo Pilot MVP
b63f6bd Prepare Abo Pilot for SaaS rollout
01a13a0 Expose analysis health through API path
```

- GitHub ist eingerichtet und `main` wurde gepusht:

```text
https://github.com/danielkupper1-oss/abo-pilot
```

- Remote:

```text
origin https://github.com/danielkupper1-oss/abo-pilot.git
```

- Hostinger-Deployment wurde durchgefuehrt, Details siehe Abschnitt `Update 2026-05-29: GitHub, Hostinger, DNS`.
- Lokaler Worktree war nach dem Deployment sauber; diese Handoff-Datei wurde danach fuer den aktuellen Stand erneut angepasst.

## Update 2026-05-29: GitHub, Hostinger, DNS

### GitHub

- Repository erstellt:

```text
https://github.com/danielkupper1-oss/abo-pilot
```

- `main` ist auf GitHub.
- Letzter gepushter Commit:

```text
01a13a0 Expose analysis health through API path
```

- Vor dem Push waren diese Checks erfolgreich:

```bash
node --check app.js
node --check analysis-server.js
```

### Hostinger VPS

- SSH-Ziel, das erfolgreich verwendet wurde:

```bash
ssh -i ~/.ssh/theater_planner_hostinger root@187.127.83.128
```

- Server-Hostname:

```text
srv1702245
```

- Docker ist installiert und laeuft.
- Abo Pilot wurde unter folgendem Pfad geklont:

```text
/home/deploy/apps/abo-pilot
```

- Deployment-Befehl auf dem VPS:

```bash
cd /home/deploy/apps/abo-pilot
sudo -u deploy git pull --ff-only
sudo -u deploy docker compose up -d --build
```

- Laufende Abo-Pilot-Container:

```text
abo-pilot
abo-pilot-analysis
```

- Abo Pilot ist serverlokal erreichbar:

```text
http://127.0.0.1:8080/
http://127.0.0.1:8080/api/health
http://127.0.0.1:8080/api/analyze
```

- Gepruefte Server-Antworten:
  - Frontend: `200 OK`
  - `/api/health`: `{"ok":true}`
  - `/api/analyze`: regelbasierte JSON-Antwort

### Caddy / Reverse Proxy

- Auf dem VPS laeuft bereits Theater Planner mit Caddy.
- Caddy-Projektpfad:

```text
/home/deploy/apps/theater-planner
```

- Wichtige Dateien:

```text
/home/deploy/apps/theater-planner/compose.yml
/home/deploy/apps/theater-planner/Caddyfile
```

- Caddy ist mit dem Docker-Netzwerk von Abo Pilot verbunden:

```text
abo-pilot_default
```

- Aktuelle Routing-Idee:
  - `abo.runningdanny.ch` soll zu Abo Pilot gehen.
  - Theater Planner bleibt vorerst nicht auf `runningdanny.ch`; er bekommt spaeter eine eigene Domain.
  - Der bisherige IP-/Fallback-Zugriff fuer Theater Planner soll weiter funktionieren.

- Aktueller Caddyfile-Zielzustand nach Reparatur des IP-Zugriffs:

```caddyfile
{
  auto_https disable_redirects
  default_sni 187.127.83.128
}

http://abo.runningdanny.ch {
  redir https://abo.runningdanny.ch{uri} permanent
}

https://abo.runningdanny.ch {
  reverse_proxy abo-pilot:80
}

https://187.127.83.128 {
  tls internal
  reverse_proxy app:3000
}

:80 {
  reverse_proxy app:3000
}
```

Wichtig: `https://187.127.83.128` kann wegen internem Zertifikat eine Browser-Warnung zeigen. `http://187.127.83.128` ist fuer den IP-Fallback die unkomplizierte Variante.

### DNS fuer Abo Pilot

- Gewuenschte Subdomain:

```text
abo.runningdanny.ch
```

- Hostinger DNS-Zone liefert direkt auf den Hostinger-Nameservern korrekt:

```text
abo.runningdanny.ch. 14400 IN A 187.127.83.128
```

- Nameserver laut User:

```text
horizon.dns-parking.com
orbit.dns-parking.com
```

- Oeffentliche Resolver bzw. `.ch`-Registry sahen die Domain zeitweise noch als `NXDOMAIN`.
- Schlussfolgerung: Hostinger-Zone ist eingetragen, aber Registry-/DNS-Propagation war noch nicht weltweit sichtbar.
- TTL wurde von Hostinger auf Standard `14400` gesetzt. Es kann mehrere Stunden dauern.

- Optionaler IPv6-Eintrag, falls in Hostinger gewuenscht:

```text
AAAA abo 2a02:4780:79:6bb7::1
```

### Traefik-Hinweis

- Hostinger bot an, Traefik bereitzustellen.
- Nicht aktivieren, solange Caddy bereits Reverse Proxy fuer Theater Planner und Abo Pilot ist.
- Traefik wuerde ebenfalls Ports `80`/`443` beanspruchen und koennte die bestehende Caddy-Konfiguration stoeren.

### Wichtige Falle aus diesem Chat

- Nach Aktivierung von Port `443` fuer Caddy war `https://187.127.83.128` fuer Theater Planner zunaechst kaputt.
- Grund: Caddy hatte nur eine HTTPS-Route fuer `abo.runningdanny.ch`, aber keinen sinnvollen HTTPS-Fallback fuer IP-Zugriff.
- Reparatur:
  - `default_sni 187.127.83.128`
  - `https://187.127.83.128 { tls internal; reverse_proxy app:3000 }`
  - `auto_https disable_redirects`, damit `http://187.127.83.128` nicht automatisch auf HTTPS gezwungen wird.

### Naechste Pruefung

Wenn DNS sichtbar ist, pruefen:

```bash
dig abo.runningdanny.ch A
curl -I http://abo.runningdanny.ch
curl -k -I https://abo.runningdanny.ch
```

Erwartung:

- `http://abo.runningdanny.ch` redirectet auf HTTPS.
- `https://abo.runningdanny.ch` zeigt Abo Pilot.
- Caddy holt automatisch ein Let's-Encrypt-Zertifikat.

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
- Einmalige Policen haben ein eigenes Intervall `Einmalig` (`once`), `Von/Bis`, keine Erneuerung und erscheinen nicht in Kuendigungsagenda/Erneuerungskalender.
- Einmalige Policen werden nicht in laufende Monats-/Jahreskosten eingerechnet.
- In der Detailansicht steht bei einmaligen Policen `Total` statt `Monatlich`; laufende Monatskosten bleiben `CHF 0.00`.
- CSS Reiseversicherung wurde als Spezialfall normalisiert:
  - 30-Tage-Reiseversicherung
  - Start `27.05.2026`
  - Bis `25.06.2026`
  - Intervall `Einmalig`
  - keine Erneuerung
  - keine Kuendigungsfrist
  - Betrag soll nur die echte Praemie/Totalrechnung sein, nicht eine Versicherungssumme.
- PDF-Upload pro Abo/Police:
  - `<input type="file" accept="application/pdf,.pdf" multiple>`
  - PDFs werden im statischen MVP lokal im Browser gespeichert.
  - Limit aktuell: 1.5 MB pro PDF, damit `localStorage` nicht sofort volllaeuft.
  - Detailansicht zeigt PDF-Liste mit Download-Link.
  - PDFs koennen direkt in der Detailansicht mit `PDF hinzufügen` hochgeladen werden, ohne den Eintrag zu bearbeiten.
  - `PDF hinzufügen` nutzt einen direkt eingebetteten Datei-Input, damit keine mehrfach verwendete Input-ID auf einen unsichtbaren Bereich zeigt.
  - Im Dokumentbereich wird ein PDF-Zaehler angezeigt, z. B. `Keine PDFs` oder `1 PDF`.
  - Wenn `localStorage` voll ist, wird der Upload zurueckgerollt und es erscheint eine Speichermeldung statt einer falschen Erfolgsmeldung.
- PDF-Auslesen:
  - Button `PDF auslesen` ist in den Detailansichten verdrahtet.
  - Fuer echtes Auslesen muss der Analyse-Service unter `/api/analyze-document` laufen.
  - Wenn nur der statische Server laeuft, zeigt die App eine verstaendliche Fehlermeldung statt scheinbar nichts zu tun.
  - Die regelbasierte PDF-Auswertung wurde nach einem CSS-Reiseversicherungs-Test vorsichtiger gemacht:
    - bekannte Anbieter wie CSS/AXA/Zurich werden sauberer erkannt.
    - Versicherungssummen/Deckungen wie `CHF 5'000.00` werden nicht mehr als Prämie/Kosten übernommen.
    - Notfall-Rubriken werden nicht mehr als Anbieter interpretiert.
  - PDFs koennen in der Detailansicht jetzt einzeln mit `PDF löschen` entfernt werden.
  - Das Loeschen nutzt den bestehenden Sicherheitsdialog und entfernt das PDF aus `localStorage`.
  - Nach Loeschen eines PDFs wird eine bestehende PDF-Auswertung fuer den Eintrag zurueckgesetzt.
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

## Runningdanny.ch Coming-Soon-Seite

- Fuer die Hauptdomain `runningdanny.ch` wurde eine eigene statische Coming-Soon-Seite gebaut.
- Lokaler Projektpfad:

```text
/private/tmp/runningdanny-site
```

- Lokale Vorschau laeuft auf:

```text
http://localhost:8090
```

- Designrichtung: dunkle Pixel-/HUD-Startseite im Stil des akzeptierten Konzeptbilds:
  - grosser Pixel-Titel `runningdanny.ch`
  - Slogan `Apps fuer Ablaeufe, die Standardsoftware vergisst.`
  - `// Agent Dispatch` Szene mit Pixel-Runner, City, Road und Route
  - `// Mission Control` mit Abo Pilot, Theater Planner, DNS und Main site
  - `// System Log` und `// Info`
- Mobile QA wurde per Screenshot geprueft; horizontales Ueberlaufen wurde behoben.
- Hostinger Deployment:

```text
/home/deploy/apps/runningdanny-site
```

- Docker-Container:

```text
runningdanny-site
```

- Interne Hostinger-Pruefung erfolgreich:

```text
http://127.0.0.1:8090 -> HTTP 200
Host: runningdanny.ch via Caddy -> liefert runningdanny.ch HTML
```

## Update 2026-05-29: letzte Abo-Pilot-App-Aenderungen

- Frontend wurde mehrfach mit Cache-Busting ausgeliefert; aktuell:

```text
app.js?v=20260529-6
styles.css?v=20260529-6
```

- Hostinger-Deployment wurde nach den letzten Aenderungen erneut gebaut:

```bash
cd /home/deploy/apps/abo-pilot
sudo -u deploy docker compose up -d --build abo-pilot abo-pilot-analysis
```

- Geprueft:

```text
http://127.0.0.1:8080/ -> HTTP 200
http://127.0.0.1:8080/api/health -> {"ok":true}
```

- Wichtige UX-Hinweise:
  - Nach Deployments im Browser hart neu laden: `Cmd + Shift + R`.
  - Der grosse Button `Löschen` unten loescht den ganzen Eintrag.
  - `PDF löschen` loescht nur das einzelne PDF und sitzt direkt in der PDF-Zeile neben `PDF auslesen`.
  - `PDF hinzufügen` sitzt im Dokumentbereich der Detailansicht.

## Update 2026-05-29: E-Mail-Empfang und Versand

- E-Mail-Empfang bei Hostinger wurde geprueft:
  - `runningdanny.ch` hat oeffentlich sichtbare MX-Eintraege:
    - `mx1.hostinger.com`
    - `mx2.hostinger.com`
  - Die Google-Fehlermeldung `DNS type 'mx' lookup of runningdanny ... NXDOMAIN` lag an einer falsch geschriebenen Empfaengeradresse ohne `.ch`.
  - Mit vollstaendiger Adresse `...@runningdanny.ch` hat der Empfang funktioniert.

- E-Mail-Versand aus Abo Pilot wurde vorbereitet:
  - Neuer API-Endpunkt im Analyse-Service: `POST /api/send-cancellation`
  - Neuer Status-Endpunkt: `GET /api/mail/status`
  - Frontend-Detailansicht hat einen Button `Kündigung per E-Mail senden`.
  - Der Button nutzt die hinterlegte `Anbieter-E-Mail` (`supportEmail`) und sendet einen einfachen Kuendigungstext.
  - Vor dem Versand erscheint ein Browser-Confirm.
  - Ohne SMTP-Konfiguration antwortet der Service klar mit `503` und Hinweis auf fehlende Variablen.

- Neue/benoetigte SMTP-Umgebungsvariablen fuer den VPS:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@runningdanny.ch
SMTP_PASS=dein-mailbox-passwort
MAIL_FROM=hello@runningdanny.ch
MAIL_REPLY_TO=hello@runningdanny.ch
```

- `analysis-package.json` enthaelt neu `nodemailer`.
- Lokal geprueft:

```bash
node --check app.js
node --check analysis-server.js
```

- Lokaler API-Test auf Port `8799`:

```text
GET /api/mail/status -> {"configured":false,"host":"smtp.hostinger.com","port":465,"secure":true,"from":""}
POST /api/send-cancellation ohne SMTP-Daten -> HTTP 503 mit erklaerender JSON-Meldung
```

## Offene technische Schuld

- Dokumente liegen weiter als Data-URLs im `localStorage`.
- Fuer echte Nutzung braucht es weiterhin echten Datei-Storage und ein Backend.
- Das PDF-Auslesen ist im statischen MVP nur heuristisch/optional mit Analyse-Service; Ergebnisse muessen vor `In Eintrag übernehmen` kontrolliert werden.
- E-Mail-Versand braucht noch echte SMTP-Secrets auf dem VPS und danach einen echten Versandtest an eine sichere Testadresse.

## Update 2026-05-29: Ollama auf Hostinger aktiviert

- Ollama wurde auf dem Hostinger-VPS fuer Abo Pilot gestartet:

```bash
cd /home/deploy/apps/abo-pilot
sudo -u deploy docker compose --profile ai up -d ollama
```

- Das Modell wurde in den Ollama-Container geladen:

```bash
docker compose exec -T ollama ollama pull qwen2.5:3b
```

- Der Analyse-Service fiel zuerst weiter auf `fallback` zurueck, weil `ANALYSIS_TIMEOUT_MS` in `docker-compose.yml` fest auf `20000` stand und die CPU-Inferenz knapp laenger braucht.
- Fix auf dem VPS und lokal:

```yaml
ANALYSIS_TIMEOUT_MS: "${ANALYSIS_TIMEOUT_MS:-60000}"
```

- In `/home/deploy/apps/abo-pilot/.env` steht nun:

```env
ANALYSIS_TIMEOUT_MS=60000
```

- Danach wurde `abo-pilot-analysis` neu gebaut/gestartet.
- Erfolgreicher Test:

```text
POST http://127.0.0.1:8080/api/analyze
-> "source":"ollama"
-> "model":"qwen2.5:3b"
```

- Laufende Container:

```text
abo-pilot
abo-pilot-analysis
abo-pilot-ollama
```

- Ressourcennotiz nach Aktivierung:
  - Ollama nutzt im Leerlauf ca. `2.2 GiB` RAM.
  - Root-Dateisystem: ca. `32G` belegt, `65G` frei.
  - Docker-Volumes enthalten ca. `1.93G` fuer das Modell.
  - Docker-Build-Cache ist weiterhin gross, ca. `16G`, bei Bedarf spaeter bereinigen.

## Update 2026-05-29: Ollama wieder deaktiviert

- Entscheidung: Fuer den aktuellen MVP wird auf Ollama verzichtet, weil Serverplatz und RAM fuer Theater Planner und weitere Projekte wichtiger sind.
- Ollama wurde auf dem VPS wieder entfernt:
  - Container `abo-pilot-ollama` gestoppt und entfernt.
  - Volume `abo-pilot_ollama-models` entfernt.
  - Image `ollama/ollama:latest` entfernt.
- `docker-compose.yml` wurde wieder auf normalen Betrieb ohne Ollama-Service reduziert.
- Neuer Schutz im Analyse-Service:

```env
ENABLE_OLLAMA=false
```

- `analysis-server.js` fragt Ollama nur noch ab, wenn `ENABLE_OLLAMA=true` gesetzt ist.
- Dadurch wartet `/api/analyze` nicht mehr auf einen fehlenden Ollama-Host.
- Erfolgreicher Test nach Rueckbau:

```text
POST http://127.0.0.1:8080/api/analyze
-> "source":"fallback"
-> "model":null
-> Antwortzeit ca. 0.045s
```

- Laufende Abo-Pilot-Container nach Rueckbau:

```text
abo-pilot
abo-pilot-analysis
```

- Serverressourcen nach Rueckbau:
  - Root-Dateisystem: ca. `20G` belegt, `77G` frei.
  - RAM verfuegbar: ca. `6.5GiB`.
  - Kein Ollama-Image und kein Ollama-Volume mehr vorhanden.

## Sinnvolle naechste Schritte

1. Datenmodell finalisieren: Abo, Handy-Vertrag, Police, Dokument, Kontakt, Reminder.
2. Entscheiden, ob Umstieg auf React/Next.js gemacht wird.
3. Dokumenten-Handling aus `localStorage` in echten Storage verschieben.
4. Tags/Status/Fristen als eigene strukturierte Felder ausbauen.
5. Backend-Architektur definieren.
6. Danach GitHub-Repo erstellen und deployen.
