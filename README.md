# Abo Pilot

Abo Pilot ist eine moderne Web-App zum Verwalten von Abos, Zeitungen, Magazinen, Online-Diensten und Familien-Handyvertraegen.

Der aktuelle Stand ist ein eigenstaendiger Frontend-MVP mit lokaler Speicherung im Browser. Er ist bewusst so geschnitten, dass daraus ein SaaS-Produkt mit Accounts, Mandanten, Erinnerungen und Zahlungsplaenen entstehen kann.

## Funktionen im MVP

- Dashboard mit monatlichen und jaehrlichen Abo-Kosten
- Fristen-Zentrale mit Kuendigungsagenda und Erneuerungskalender
- Erfassung von Anbieter, Adresse, Login-E-Mail, Support-E-Mail und Vertragsnummer
- Familien-Handy-Abos mit Familienmitglied, SIM/Vertrag, PIN und PUK
- PIN/PUK standardmaessig maskiert, Anzeige nur nach Master-Passwort
- Anbieter-Vorauswahl fuer gaengige Abos
- Filter fuer Fristen, Familie und Kategorien
- Interne Analyse-Schicht fuer Kosten, Fristen und Datenqualitaet
- Optionale Ollama-Zusammenfassung, wenn der Analyse-Service mit lokalem Modell laeuft
- PDF-Auswertung fuer Policen und Vertrage mit strukturiertem Uebernahme-Vorschlag
- Strukturierte Tags, Reminder-Datum und vorbereiteter Reminder-Kanal je Eintrag
- Kuendigungstext-Generator
- Responsive Desktop- und Mobile-Oberflaeche

Demo-Passwort fuer PIN/PUK: `pilot`

## Lokal starten

Die App ist statisch und kann direkt im Browser geoeffnet werden:

```bash
open index.html
```

Alternativ mit einem lokalen Server:

```bash
python3 -m http.server 8080
```

Dann `http://localhost:8080` oeffnen.

## Analyse-Schicht mit Ollama

Die App kann eine interne Analyse-API unter `/api/analyze` verwenden. Diese API berechnet harte Kennzahlen regelbasiert und fragt optional Ollama fuer eine kurze deutschsprachige Zusammenfassung ab.

Zusaetzlich kann `/api/analyze-document` PDF-Dokumente auslesen. Der Service extrahiert PDF-Text serverseitig, erkennt typische Vertragsfelder wie Policennummer, Betrag, Laufzeit und Kuendigungsfrist und zeigt in der App einen Vorschlag zum Uebernehmen an.

Auf einem kleinen VPS wie Hostinger KVM 2 ist das bewusst defensiv gebaut:

- Die App funktioniert weiter, wenn Ollama nicht erreichbar ist.
- PIN, PUK und PDF-Inhalte werden nicht an die Analyse-API gesendet.
- PIN und PUK werden nicht an die Analyse-API gesendet.
- PDF-Inhalte bleiben im eigenen Analyse-Service und werden nur intern an Ollama weitergegeben, falls Ollama aktiv ist.
- Ollama wird nicht direkt vom Browser aufgerufen.
- Ein kleines Modell wie `qwen2.5:3b` ist als Startpunkt vorgesehen.
- Gescannte Bild-PDFs brauchen spaeter OCR; digitale PDFs funktionieren ueber Text-Extraktion.

Mit Docker:

```bash
docker compose up -d --build
```

Mit optionalem Ollama-Container:

```bash
docker compose --profile ai up -d --build
docker compose exec ollama ollama pull qwen2.5:3b
```

## Deployment

Siehe [DEPLOYMENT.md](DEPLOYMENT.md) fuer Hostinger-VPS-Deployment mit Docker und Nginx.

## Architektur und naechste Schritte

Die Punkte aus dem aktuellen Handoff sind lokal umgesetzt bzw. entscheidungsreif dokumentiert:

- [Datenmodell](docs/DATA_MODEL.md): Abo, Handy-Vertrag, Police, Dokument, Kontakt, Reminder und Secrets.
- [Architektur](docs/ARCHITECTURE.md): statischer MVP bleibt vorerst, Next.js folgt mit Auth/Backend/Postgres.
- [Dokumenten-Storage](docs/DOCUMENT_STORAGE.md): Weg von `localStorage` zu Objekt-Storage plus Postgres-Metadaten.
- Tags und Reminder-Felder sind bereits in der MVP-Erfassung sichtbar.
- [GitHub/Deployment-Checkliste](docs/GITHUB_DEPLOYMENT_CHECKLIST.md): Repo- und VPS-Schritte fuer den naechsten manuellen Release.

## SaaS-Roadmap

Der aktuelle MVP speichert Daten in `localStorage`. Fuer ein echtes SaaS-Angebot sollten als naechste Schritte umgesetzt werden:

1. Authentifizierung: E-Mail/Login, Passwort-Reset, optional 2FA.
2. Mandantenmodell: Nutzer, Familien, Haushalte, Rollen und Berechtigungen.
3. Datenbank: Postgres-Tabellen fuer Abos, Anbieter, Dokumente, Erinnerungen, Audit-Log.
4. Geheimnisse: PIN/PUK serverseitig verschluesseln, getrennte Key-Verwaltung.
5. Erinnerungen: E-Mail- und Kalender-Benachrichtigungen vor Fristen.
6. Dokumente: Upload fuer Vertrage, Rechnungen, Kuendigungen und Bestaetigungen.
7. Zahlungen: SaaS-Plaene, Testphase, Rechnungen, Stripe/Checkout.
8. Admin: Nutzerverwaltung, Support-Ansicht, Planlimits, Statusseite.
9. Rechtliches: AGB, Datenschutz, Auftragsbearbeitung, Datenexport und Loeschung.

## Produktidee

Abo Pilot soll nicht nur eine Liste sein, sondern ein Kontrollzentrum:

- Was kostet mich alles pro Monat und Jahr?
- Welche Abos verlaengern sich bald?
- Was muss ich bis wann kuendigen?
- Wo sind Kundennummer, Adresse, Supportkontakt und Kuendigungsweg?
- Welche Familien-Handyvertraege gehoeren zu wem?
- Welche sensiblen Daten duerfen nur nach Freigabe sichtbar sein?
