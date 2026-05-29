# Dokumenten-Handling

Stand: 2026-05-29

## Aktueller MVP

PDFs werden im Browser per Data-URL in `localStorage` gespeichert. Das ist praktisch fuer Tests, aber nicht fuer echte Nutzung geeignet.

Aktuelle Grenzen:

- 1.5 MB pro PDF
- Speicher nur in einem Browserprofil
- keine Backups
- keine zentrale Loeschung
- keine Zugriffskontrolle ausserhalb der lokalen App

## Ziel fuer SaaS

PDF-Dateien und Avatare liegen in Objekt-Storage, z. B. S3-kompatibel, Supabase Storage oder serverseitige VPS-Ablage. In Postgres werden nur Metadaten gespeichert.

## Upload-Ablauf

1. Nutzer waehlt PDF.
2. Frontend fragt Upload-URL bei der API an.
3. Datei wird direkt oder ueber API in Storage geschrieben.
4. API speichert `documents`-Metadaten.
5. Analyse-Job wird gestartet.
6. Analyse-Ergebnis wird als Vorschlag am Vertrag angezeigt.

## Storage-Key

Empfohlenes Format:

```text
households/{household_id}/contracts/{contract_id}/documents/{document_id}.pdf
```

## Aufbewahrung und Loeschung

- Loeschen eines Vertrags entfernt Dokumente nicht sofort hart, sondern markiert sie fuer kurze Wiederherstellungsfrist.
- Datenschutz-Loeschung entfernt Dokumente nach Ablauf der gesetzlichen und vertraglichen Pflichten vollstaendig.
- Exporte enthalten Dokument-Metadaten und optional signierte Download-Links.

## Analyse

Digitale PDFs werden per Text-Extraktion verarbeitet. Gescannte PDFs brauchen OCR und werden spaeter als eigener Worker-Schritt geplant.
