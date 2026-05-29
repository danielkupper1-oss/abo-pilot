# Deployment auf Hostinger VPS

Diese Version von Abo Pilot besteht aus einem statischen Frontend, einem kleinen internen Analyse-Service und optional Ollama. Fuer den MVP liefert die Analyse auch ohne Ollama regelbasierte Ergebnisse.

## Voraussetzungen

- Ubuntu VPS bei Hostinger
- Domain oder Subdomain, z. B. `abo.example.com`
- Docker und Docker Compose
- SSH-Zugang zum Server

## Server vorbereiten

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx
sudo systemctl enable --now docker
```

## App deployen

```bash
git clone https://github.com/danielkupper1-oss/abo-pilot.git
cd abo-pilot
docker compose up -d --build
```

Die App laeuft danach lokal auf dem Server unter `http://127.0.0.1:8080`. Die interne Analyse-API ist nur ueber Nginx unter `/api/analyze` und `/api/analyze-document` erreichbar.

Vor dem ersten Push und Deployment siehe auch [docs/GITHUB_DEPLOYMENT_CHECKLIST.md](docs/GITHUB_DEPLOYMENT_CHECKLIST.md).

## Ollama optional aktivieren

Auf Hostinger KVM 2 laeuft Ollama CPU-basiert und sollte mit einem kleinen Modell starten. Der Ollama-Container ist deshalb hinter dem Compose-Profil `ai` versteckt:

```bash
docker compose --profile ai up -d --build
docker compose exec ollama ollama pull qwen2.5:3b
```

Der Analyse-Service verwendet standardmaessig:

```text
OLLAMA_BASE_URL=http://ollama:11434
OLLAMA_MODEL=qwen2.5:3b
ANALYSIS_TIMEOUT_MS=20000
```

Wichtig fuer den VPS:

- Ollama nicht direkt per Public Port veroeffentlichen.
- Bei KVM 2 keine grossen 7B/13B-Modelle als Dauerlast einplanen.
- Wenn Theater Kalender und Newsletter ebenfalls laufen, nur kleine Modelle und kurze Analysen nutzen.
- Digitale PDFs werden per Text-Extraktion verarbeitet. Gescannte Bild-PDFs brauchen spaeter OCR und sollten auf KVM 2 nur optional laufen.
- Falls der Server unter Last kommt, Ollama-Container stoppen und die regelbasierte Analyse weiterverwenden:

```bash
docker compose stop ollama
```

## Nginx Reverse Proxy

Beispiel fuer `/etc/nginx/sites-available/abo-pilot`:

```nginx
server {
    listen 80;
    server_name abo.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktivieren:

```bash
sudo ln -s /etc/nginx/sites-available/abo-pilot /etc/nginx/sites-enabled/abo-pilot
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS aktivieren

```bash
sudo certbot --nginx -d abo.example.com
```

## Updates deployen

```bash
cd abo-pilot
git pull
docker compose up -d --build
```

## Hinweis fuer SaaS-Betrieb

Diese statische MVP-Version ist fuer Produktvalidierung und UI-Tests geeignet. Fuer zahlende Kunden braucht es danach mindestens:

- Backend-API
- Authentifizierung
- Datenbank
- serverseitige Verschluesselung fuer PIN/PUK
- Backups
- Monitoring
- rechtliche Seiten und Datenschutzprozesse
