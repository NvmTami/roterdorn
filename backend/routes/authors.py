from flask import Blueprint, jsonify
from mysql.connector import Error
from db import get_db, row_to_dict

authors_bp = Blueprint("authors", __name__, url_prefix="/api")

@authors_bp.get("/authors")
def get_authors():
    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT id, name, email, bio, created_at
            FROM authors
            ORDER BY name
        """)
        rows = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("created_at"):
                item["created_at"] = str(item["created_at"])
        return jsonify({"authors": result})
    except Error:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()
