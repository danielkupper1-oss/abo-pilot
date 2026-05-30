# Dokumenten-Handling

Stand: 2026-05-30

## Aktueller MVP

PDFs werden im Browser per Data-URL in `localStorage` gespeichert. Das ist praktisch fuer Tests, aber nicht fuer echte Nutzung geeignet.

Aktuelle Grenzen:

- 1.5 MB pro PDF
- Speicher nur in einem Browserprofil
- Backups nur als lokaler JSON-Export aus der App
- keine zentrale Loeschung
- keine Zugriffskontrolle ausserhalb der lokalen App

## Lokale Umsetzung jetzt

- Vertragsdetails zeigen einen Hinweis, dass PDFs aktuell Browserdaten sind.
- Der Sicherheitsbereich bietet JSON-Export und Import mit Vorschau.
- Der Import ueberschreibt keine vorhandenen Vertraege automatisch.
- Dubletten werden anhand von ID und Vertragssignatur uebersprungen.
- Grosse PDF-Archive bleiben weiterhin bewusst ausserhalb des MVP.

## Naechster Schritt ohne Login

Vor SaaS/Login kann ein lokaler Storage-Adapter vorbereitet werden:

1. Dokument-Metadaten im Vertrag behalten, aber Data-URL als austauschbares Feld behandeln.
2. Exportformat stabil halten: `subscriptions[].documents[]` mit `id`, `name`, `size`, `type`, `uploadedAt`.
3. Analyse nur gegen die aktuell verfuegbare Dateiquelle ausfuehren.
4. Spaeter Data-URL durch `storageKey` und signierte Download-URL ersetzen.

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
