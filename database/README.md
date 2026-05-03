# Datenbank Setup

## Voraussetzungen
- MySQL 8.0+ oder MariaDB 10.5+

## Erstinstallation

    mysql -u root -p < schema_new.sql
    mysql -u root -p < seed_data.sql

## DB zurücksetzen

    mysql -u root -p -e "DROP DATABASE IF EXISTS roterdorn;"
    mysql -u root -p < schema_new.sql
    mysql -u root -p < seed_data.sql