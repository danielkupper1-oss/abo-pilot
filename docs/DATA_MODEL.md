# Abo Pilot Datenmodell

Stand: 2026-05-29

Dieses Zielmodell trennt normale Abos, Handy-Vertraege, Policen, Dokumente, Kontakte und Reminder, bleibt aber nah am aktuellen MVP.

## Kernprinzipien

- Ein Vertrag ist immer einem Haushalt zugeordnet.
- Normale Abos, Handy-Vertraege und Policen teilen Basisfelder, haben aber eigene Detailfelder.
- Dokumente liegen nicht im Vertragsdatensatz, sondern in Storage plus Metadaten.
- PIN, PUK und andere Geheimnisse liegen getrennt und verschluesselt.
- Reminder sind eigene Datensaetze, damit mehrere Erinnerungen pro Vertrag moeglich sind.

## Entitaeten

### users

- `id`
- `email`
- `display_name`
- `password_hash` oder externer Auth-Provider
- `created_at`
- `last_login_at`

### households

- `id`
- `name`
- `owner_user_id`
- `plan`
- `created_at`

### household_members

- `id`
- `household_id`
- `user_id`
- `name`
- `role`: `owner`, `manager`, `viewer`
- `is_child`

### contracts

Gemeinsame Tabelle fuer Abo, Handy-Vertrag und Police.

- `id`
- `household_id`
- `type`: `subscription`, `mobile_contract`, `policy`
- `provider_id`
- `name`
- `category`
- `amount`
- `currency`
- `billing_interval`: `monthly`, `quarterly`, `yearly`, `one_time`
- `start_date`
- `renewal_date`
- `end_date`
- `no_renewal`
- `notice_days`
- `status`: `active`, `trial`, `canceled`, `paused`, `archived`
- `tags`: Textarray oder separate Join-Tabelle bei wachsender Komplexitaet
- `notes`
- `created_at`
- `updated_at`

### mobile_contract_details

- `contract_id`
- `household_member_id`
- `phone_number`
- `sim_or_contract_number`
- `pin_secret_id`
- `puk_secret_id`

### policy_details

- `contract_id`
- `policy_number`
- `insured_person`
- `policy_kind`
- `coverage_summary`

### providers

- `id`
- `name`
- `logo_url`
- `support_email`
- `support_url`
- `postal_address`
- `cancellation_channel`

### contacts

- `id`
- `contract_id`
- `kind`: `login`, `support`, `billing`, `postal`
- `email`
- `phone`
- `url`
- `address`

### documents

- `id`
- `contract_id`
- `storage_key`
- `original_name`
- `mime_type`
- `size_bytes`
- `sha256`
- `document_type`: `contract`, `invoice`, `policy`, `cancellation`, `confirmation`, `other`
- `analysis_status`: `pending`, `done`, `failed`
- `created_at`

### reminders

- `id`
- `contract_id`
- `kind`: `cancellation`, `renewal`, `manual`, `missing_data`
- `due_at`
- `channel`: `app`, `email`, `calendar`
- `status`: `open`, `sent`, `done`, `dismissed`
- `created_at`

### secret_values

- `id`
- `household_id`
- `kind`: `pin`, `puk`, `password`, `other`
- `encrypted_value`
- `key_version`
- `created_at`
- `last_revealed_at`

### audit_log

- `id`
- `household_id`
- `actor_user_id`
- `action`
- `target_type`
- `target_id`
- `metadata`
- `created_at`

## MVP-Mapping

Der aktuelle `localStorage`-Datensatz entspricht weitgehend `contracts`. Die neuen Felder `tags`, `reminderDate` und `reminderChannel` sind bewusst kompatibel zur spaeteren `reminders`-Tabelle.

## Migration

1. Browser-Daten als JSON exportieren.
2. Anbieter anhand Name deduplizieren und in `providers` schreiben.
3. Vertraege in `contracts` schreiben.
4. Handy- und Policen-Zusatzdaten aus `category`, `familyMember` und `contractNumber` ableiten.
5. Dokumente aus Data-URLs in Objekt-Storage verschieben und `documents`-Metadaten speichern.
6. PIN/PUK in `secret_values` verschluesseln und Klartext aus Vertragsdaten entfernen.
