# Deployment auf Hostinger VPS

Diese Version von Abo Pilot besteht aus einem statischen Frontend und einem kleinen internen Analyse-Service. Fuer den MVP liefert die Analyse regelbasierte Ergebnisse.

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

## Zugriffsschutz

Fuer oeffentlich erreichbare Deployments sollte Basic Auth aktiviert werden. Dazu in der `.env` neben `docker-compose.yml` setzen:

```env
ABO_BASIC_AUTH_USER=abo
ABO_BASIC_AUTH_PASSWORD=ein-langes-zufaelliges-passwort
```

Danach den Frontend-Container neu bauen/starten:

```bash
docker compose up -d --build abo-pilot
```

## E-Mail-Versand

Der Analyse-Service stellt zusaetzlich `/api/send-cancellation` fuer Kuendigungs-E-Mails bereit. Fuer Hostinger-Mail muessen die SMTP-Zugangsdaten als Umgebungsvariablen gesetzt werden, z. B. in einer `.env` neben `docker-compose.yml` auf dem VPS:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@runningdanny.ch
SMTP_PASS=dein-mailbox-passwort
MAIL_FROM=hello@runningdanny.ch
MAIL_REPLY_TO=hello@runningdanny.ch
```

Danach den Analyse-Container neu bauen/starten:

```bash
sudo -u deploy docker compose up -d --build abo-pilot-analysis abo-pilot
```

Der Status ist intern ueber `/api/mail/status` sichtbar; Passwoerter werden dort nicht ausgegeben.

Vor dem ersten Push und Deployment siehe auch [docs/GITHUB_DEPLOYMENT_CHECKLIST.md](docs/GITHUB_DEPLOYMENT_CHECKLIST.md).

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
