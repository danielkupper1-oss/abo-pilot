# Abo Pilot UX Verbesserungen

Stand: 30.05.2026

Diese Liste sammelt die priorisierten Usability- und Funktionsverbesserungen fuer die lokale Weiterentwicklung von Abo Pilot.

## Prioritaet 1: Sofort spuerbare Bedienbarkeit

1. Mobile Touch-Ziele auf mindestens 44 x 44 px bringen, insbesondere Navigation, Theme-Button, Segment-Filter und Row-Aktionen.
2. Mobile Navigation vereinfachen: Hauptpunkte klar sichtbar halten und Nebenbereiche wie Archiv, Sicherheit und SaaS Admin spaeter in ein Mehr-/Einstellungsmenue verschieben.
3. Dashboard-Filter sichtbarer machen: aktive Suche/Kategorie mit Trefferzahl und Reset-Moeglichkeit anzeigen.
4. Abo-Editor klarer beschriften: "Anbieter suchen" und "Name" in "Vorlage / Anbieter" und "Titel des Abos" trennen.
5. Ambivalente Aktionslabels ersetzen, z. B. "Gekuendigt" durch "Als gekuendigt markieren".
6. Fristen- und Erneuerungslisten konsequent klickbar machen, damit Nutzer immer direkt beim passenden Abo landen.

## Prioritaet 2: Formular und Informationsarchitektur

1. Abo-Formular in logischere Abschnitte oder Akkordeons aufteilen: Basisdaten, Fristen, Kosten, Kontakt, Dokumente.
2. Pflichtfelder, optionale Felder und automatisch uebernommene Vorlagenwerte klar kennzeichnen.
3. Fehlende Kosten nicht als CHF 0.00 anzeigen, sondern als "Betrag fehlt" oder Datenqualitaets-Hinweis.
4. Such- und Filterlogik pro Bereich erklaeren: globale Suche, Kategorie-Filter, Listenfilter und Dashboard-Filter sollen sichtbar zusammenwirken.
5. Statusmodell erweitern: aktiv, pausiert, Kuendigung vorbereitet, Kuendigung gesendet, bestaetigt, archiviert.

## Prioritaet 3: Vertrauen, Sicherheit und Barrierefreiheit

1. Dark Mode mit Kontrastcheck absichern, besonders violette Flaechen, Pills und sekundäre Texte.
2. Formulare technisch robuster machen: name-Attribute, autocomplete, aria-describedby fuer Hilfs- und Fehlermeldungen.
3. Klickbare Karten auch per Tastatur bedienbar machen.
4. Dialoge mit Fokus-Management pruefen: Fokus beim Oeffnen setzen und nach Schliessen zurueckgeben.
5. Sicherheitsmodell mittelfristig ausbauen: serverseitige Speicherung, Login, Session-Timeout und verschluesselte Backups.

## Prioritaet 4: Produktfunktionen

1. Erinnerungen praktisch nutzbar machen: Kalenderexport/ICS, E-Mail-Reminder oder lokale Reminder-Uebersicht.
2. Export/Import und Backup fuer Vertragsdaten anbieten.
3. Dokumentenablage aus localStorage herausloesen und langfristig serverseitig speichern.
4. Dubletten-Erkennung fuer importierte oder mehrfach erfasste Abos.
5. Familienansicht ausbauen: pro Familienmitglied Kosten, Fristen und Verträge filtern.

## Erste lokale Umsetzung

Begonnen wird mit Prioritaet 1:

- Touch-Ziele vergroessern.
- Mobile Navigation stabilisieren.
- Filterzustand sichtbar machen.
- Editor-Labels schaerfen.
- Klickbare Erneuerungen ergaenzen.

## Umgesetzt lokal

- Touch-Ziele fuer Navigation, Buttons, Inputs und Listenaktionen vergroessert.
- Dashboard-Filter mit Trefferzahl und "Filter loeschen" sichtbar gemacht.
- Abo-Editor-Labels auf "Vorlage / Anbieter" und "Titel des Abos" geschaerft.
- Kuendigungsaktion eindeutiger benannt.
- Erneuerungen im Kalender klickbar gemacht.
- Mobile Navigation auf Hauptbereiche reduziert und Nebenbereiche in ein Mehr-Menue verschoben.
- Formularfelder mit name-/autocomplete-Attributen robuster gemacht.
- Speichern/Abbrechen im langen Abo-Dialog als sticky Aktionsleiste ergaenzt.
- Groesseren eigenen Datepicker fuer Datumsfelder im Abo-Dialog ergaenzt.
- Fehlende Kosten werden in Listen und Details als "Betrag fehlt" statt CHF 0.00 angezeigt.
- Abo-Dialog mit einklappbaren Formularbereichen fuer bessere Scanbarkeit erweitert.
- Dashboard-Kategoriefilter auf das Dashboard begrenzt, damit Listen nicht durch versteckte Filter beeinflusst werden.
- Pflicht-/Optional-Hinweise im Abo-Dialog ergaenzt und fehlende Kosten beim Speichern erlaubt.
- Datenqualitaets-Badges fuer fehlende Angaben in Listen und Details ergaenzt.
- Listenfilter "Pruefen" fuer Abos mit Datenqualitaets-Hinweisen ergaenzt.
- Statusmodell auf aktiv, pausiert, Kuendigung vorbereitet, Kuendigung gesendet, bestaetigt und archiviert erweitert.
- Kuendigungsaktionen als Fortschrittsschritte statt als unklare Einmal-Aktion umgesetzt.
- Such- und Filterlogik in der Abo-Liste mit kurzem Bereichshinweis erklaert.
- Dialoge mit Fokus beim Oeffnen und Ruecksprung nach dem Schliessen robuster gemacht.
- Abo-Dialog mit aria-describedby fuer wichtige Hilfstexte und Dialog-Beschriftungen verbessert.
- Familienansicht mit Filterchips pro Familienmitglied ergaenzt.
- Kalenderexport/ICS fuer Kuendigungsfristen, Erneuerungen und Reminder ergaenzt.
- Lokalen JSON-Export und Import fuer Vertrags-Backups ergaenzt.
- Import ueberspringt vorhandene IDs und sehr aehnliche Vertragssignaturen als einfache Dubletten-Erkennung.
- Lokale Reminder-Uebersicht in der Fristen-Zentrale ergaenzt.
- Familienansicht zeigt pro Familienmitglied Monatskosten, Vertragsanzahl und naechste Frist.
- Backup-Import mit Vorschau-Dialog ergaenzt, bevor neue Eintraege uebernommen werden.
- Dokumentenhinweise in Details und Sicherheit geschaerft: PDFs liegen aktuell lokal im Browser.
- Dark-Mode-Kontrasttokens fuer Flaechen, Linien, Violett und sekundäre Texte nachgezogen.
