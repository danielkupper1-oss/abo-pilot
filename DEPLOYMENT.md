# Deployment auf Hostinger VPS

Diese Version von Abo Pilot ist ein statisches Frontend. Fuer den MVP reicht ein Nginx-Container.

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

Die App laeuft danach lokal auf dem Server unter `http://127.0.0.1:8080`.

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

