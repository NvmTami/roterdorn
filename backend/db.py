import mysql.connector
from mysql.connector import Error
from config import DB_CONFIG


def get_db():
    """Gibt eine neue DB-Verbindung zurück."""
    return mysql.connector.connect(**DB_CONFIG)


def row_to_dict(cursor, row):
    """Wandelt eine DB-Zeile in ein Dictionary um."""
    return dict(zip([col[0] for col in cursor.description], row))
