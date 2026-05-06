# Lokale Entwicklungsumgebung einrichten

Voraussetzungen: **Python 3.11+**, **Node.js 18+**, **XAMPP** (für MySQL/MariaDB)

---

## 1. Repository klonen

```bash
git clone https://github.com/NvmTami/roterdorn.git
cd roterdorn
```

---

## 2. Datenbank einrichten (XAMPP)

### 2.1 XAMPP installieren & MySQL starten

1. [apachefriends.org](https://www.apachefriends.org/download.html) → XAMPP für Windows herunterladen & installieren (Standardpfad `C:\xampp`)
2. **XAMPP Control Panel** öffnen → bei **MySQL** auf **Start** klicken
3. MySQL läuft dann auf `localhost:3306` mit User `root` und leerem Passwort

### 2.2 Datenbank anlegen und Daten einspielen

XAMPP Control Panel → **Shell** öffnen, dann:

```sql
mysql -u root
CREATE DATABASE roterdorn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE roterdorn;
SOURCE C:/Pfad/zum/Projekt/roterdorn/database/dorn_db_schema_new.sql;
SOURCE C:/Pfad/zum/Projekt/roterdorn/database/seed_data.sql;
EXIT;
```

> Pfad anpassen — Backslashes durch Schrägstriche ersetzen, da MySQL unter Windows sonst Probleme macht.

### 2.3 Verbindung prüfen

```sql
mysql -u root roterdorn -e "SELECT COUNT(*) FROM reviews;"
```

Erwartetes Ergebnis: `8` (oder mehr, falls eigene Seed-Einträge hinzugefügt wurden)

---

## 3. Backend starten (Flask)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1    # Windows PowerShell
pip install -r requirements.txt
python app.py
```

> Flask läuft danach auf **http://localhost:5000**

### Umgebungsvariablen (optional)

Die Standardwerte in `config.py` funktionieren direkt mit XAMPP.  
Für abweichende Konfiguration `.env`-Datei anlegen oder Variablen setzen:

| Variable      | Standard       | Bedeutung               |
|---------------|----------------|-------------------------|
| `DB_HOST`     | `localhost`    | MySQL-Host              |
| `DB_USER`     | `root`         | MySQL-Benutzer          |
| `DB_PASSWORD` | *(leer)*       | MySQL-Passwort          |
| `DB_NAME`     | `roterdorn`    | Datenbankname           |
| `PORT`        | `5000`         | Flask-Port              |
| `FLASK_DEBUG` | `false`        | Debug-Modus             |

### Endpoints testen (PowerShell)

```powershell
# Alle Reviews
Invoke-RestMethod http://localhost:5000/api/reviews

# Nur Bücher
Invoke-RestMethod "http://localhost:5000/api/reviews?type=buch"

# Einzelnes Review (ID 1)
Invoke-RestMethod http://localhost:5000/api/reviews/1

# Volltextsuche
Invoke-RestMethod "http://localhost:5000/api/search?q=Star"

# Statistiken
Invoke-RestMethod http://localhost:5000/api/stats
```

---

## 4. Frontend starten (Angular)

```powershell
cd frontend
npm install
ng serve
```

> Angular läuft danach auf **http://localhost:4200**

Falls `ng` nicht im PATH ist:

```powershell
.\node_modules\.bin\ng.cmd serve
```

---

## 5. Alles zusammen starten

Reihenfolge beim täglichen Arbeiten:

1. **XAMPP** → MySQL starten
2. **Terminal 1** → `cd backend && python app.py`
3. **Terminal 2** → `cd frontend && ng serve`
4. Browser → [http://localhost:4200](http://localhost:4200)

---

## Datenbankstruktur auf einen Blick

```
reviews          — Haupttabelle (id, title, media_type, rating, content, …)
authors          — Autoren (id, name, bio)
book_details     — buchspezifisch (isbn, publisher, page_count, …)
film_details     — filmspezifisch (director, runtime, …)
music_details    — musikspezifisch (artist, label, …)
game_details     — spielspezifisch (developer, players, platforms, …)
```

Vollständiges Schema: [`database/dorn_db_schema_new.sql`](../database/dorn_db_schema_new.sql)  
Beispieldaten: [`database/seed_data.sql`](../database/seed_data.sql)
