# GitHub- und Deployment-Checkliste

Stand: 2026-05-29

Der Handoff nennt als Ziel:

```text
https://github.com/danielkupper1-oss/abo-pilot
```

Aktuell wird bewusst lokal weitergearbeitet. Repo-Erstellung, Push und VPS-Deployment sollten erst nach kurzer Freigabe passieren.

## GitHub vorbereiten

```bash
gh repo create danielkupper1-oss/abo-pilot --public --source=. --remote=origin --push
```

Falls das Repo bereits existiert:

```bash
git remote add origin https://github.com/danielkupper1-oss/abo-pilot.git
git push -u origin main
```

## Vor dem Push pruefen

```bash
git status --short
node --check app.js
node --check analysis-server.js
```

## VPS deployen

```bash
ssh <server>
git clone https://github.com/danielkupper1-oss/abo-pilot.git
cd abo-pilot
docker compose up -d --build
```

## Nginx und HTTPS

1. Domain oder Subdomain auf den VPS zeigen lassen.
2. Nginx Reverse Proxy aus `DEPLOYMENT.md` anlegen.
3. `sudo nginx -t` ausfuehren.
4. `sudo certbot --nginx -d <domain>` ausfuehren.

## Deploy-Abnahmekriterien

- App ist unter HTTPS erreichbar.
- `/api/analyze` antwortet ueber den Reverse Proxy.
- `/api/analyze-document` liefert bei Test-PDF entweder Extraktion oder klare Fehlermeldung.
- Ollama ist nicht oeffentlich exponiert.
- Keine PIN/PUK oder PDF-Inhalte erscheinen in Logs.
