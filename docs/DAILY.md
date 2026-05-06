# Tägliche Entwicklung — Schnellstart

Voraussetzung: Setup einmalig durchgeführt (siehe [SETUP.md](SETUP.md))

---

## Reihenfolge beim Starten

### 1. XAMPP — MySQL starten
XAMPP Control Panel öffnen → bei **MySQL** auf **Start** klicken

---

### 2. Backend starten (Terminal 1)

```powershell
cd C:\Programmieren\Ausbildung\roterdorn\backend
.\venv\Scripts\Activate.ps1
python app.py
```

> Läuft auf **http://localhost:5000** — Terminal offen lassen

---

### 3. Frontend starten (Terminal 2)

```powershell
cd C:\Programmieren\Ausbildung\roterdorn\frontend
ng serve
```

> Läuft auf **http://localhost:4200** — Terminal offen lassen

---

## Stoppen

- Frontend / Backend: `Strg+C` im jeweiligen Terminal
- MySQL: XAMPP Control Panel → **Stop**

---

## Nützliche Befehle

### API schnell testen (PowerShell)
```powershell
# Alle Reviews
Invoke-RestMethod http://localhost:5000/api/reviews

# Einzelnes Review
Invoke-RestMethod http://localhost:5000/api/reviews/1

# Suche
Invoke-RestMethod "http://localhost:5000/api/search?q=Star"

# Statistiken
Invoke-RestMethod http://localhost:5000/api/stats
```

### Datenbank zurücksetzen
```powershell
# Aus dem Projektroot ausführen
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "DROP DATABASE IF EXISTS roterdorn; CREATE DATABASE roterdorn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
& "C:\xampp\mysql\bin\mysql.exe" --default-character-set=utf8mb4 -u root roterdorn -e "SOURCE database/dorn_db_new.sql"
```

### Git — Stand sichern
```powershell
git add .
git commit -m "beschreibung der änderung"
git push
```
