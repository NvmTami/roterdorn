# Datenbank

## Voraussetzungen
- MariaDB 10.4+ oder MySQL 8.0+ — empfohlen via **XAMPP**

## Dateien

| Datei | Inhalt |
|-------|--------|
| `dorn_db_new.sql` | Schema + 27 Seed-Reviews + Ratings — **Hauptdatei für den Import** |
| `dorn_db_schema_new.sql` | Nur das Schema (zur Referenz) |
| `dorn_db_schema_original.sql` | Original WordPress-Schema (Archiv) |
| `dorn_db_original.sql` | Original WordPress-Export (Archiv) |
| `seed_data.sql` | Ältere Seed-Datei (veraltet, nicht verwenden) |

## Erstinstallation (PowerShell, aus Projektroot)

```powershell
# Datenbank anlegen
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS roterdorn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Schema + Daten einspielen (--default-character-set ist wichtig für Umlaute)
& "C:\xampp\mysql\bin\mysql.exe" --default-character-set=utf8mb4 -u root roterdorn -e "SOURCE database/dorn_db_new.sql"
```

## DB zurücksetzen

```powershell
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "DROP DATABASE IF EXISTS roterdorn; CREATE DATABASE roterdorn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
& "C:\xampp\mysql\bin\mysql.exe" --default-character-set=utf8mb4 -u root roterdorn -e "SOURCE database/dorn_db_new.sql"
```

## Tabellenstruktur

```
authors        — Autoren (id, name, bio)
reviews        — Haupttabelle (id, title, media_type, rating, content, excerpt, cover_url, …)
book_details   — buchspezifisch (isbn, publisher, page_count, format, …)
film_details   — filmspezifisch (director, studio, runtime, fsk, …)
music_details  — musikspezifisch (artist, label, release_date, …)
game_details   — spielspezifisch (developer, publisher, min/max_players, genre, …)
```

`media_type` ist ein ENUM: `'buch' | 'film' | 'musik' | 'spiel'`  
`rating` ist `DECIMAL(2,1)` — Skala 1–5, im Frontend ×2 als /10 angezeigt.
