"""
app.py — RoterDorn Flask REST API
===================================
Startet mit:  python app.py
API läuft auf: http://localhost:5000

Endpoints:
  GET /api/reviews              → Alle Rezensionen (filterbar)
  GET /api/reviews/<id>         → Einzelne Rezension mit Details
  GET /api/stats                → Statistiken für Dashboard
  GET /api/search?q=...         → Volltextsuche
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)  # Erlaubt Angular (Port 4200) Zugriff auf Flask (Port 5000)

# ── Datenbank-Verbindung ──────────────────────────────────────
DB_CONFIG = {
    "host":     "localhost",
    "user":     "root",
    "password": "",
    "database": "roterdorn"
}

def get_db():
    """Gibt eine neue DB-Verbindung zurück."""
    return mysql.connector.connect(**DB_CONFIG)


def row_to_dict(cursor, row):
    """Wandelt eine DB-Zeile in ein Dictionary um."""
    return dict(zip([col[0] for col in cursor.description], row))


# ══════════════════════════════════════════════════════════════
# ENDPOINT 1: Alle Rezensionen (mit optionalem Filter)
# GET /api/reviews
# GET /api/reviews?type=buch
# GET /api/reviews?type=film&limit=5
# ══════════════════════════════════════════════════════════════
@app.get("/api/reviews")
def get_reviews():
    media_type = request.args.get("type")
    limit      = request.args.get("limit", 20)

    query = """
        SELECT r.id, r.title, r.media_type, r.rating,
               r.excerpt, r.published_at, r.cover_url,
               a.name AS author_name
        FROM reviews r
        JOIN authors a ON r.author_id = a.id
        WHERE r.published_at IS NOT NULL
    """
    params = []

    if media_type and media_type in ("buch", "film", "musik", "spiel"):
        query += " AND r.media_type = %s"
        params.append(media_type)

    query += " ORDER BY r.published_at DESC LIMIT %s"
    params.append(int(limit))

    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute(query, params)
        rows = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("published_at"):
                item["published_at"] = str(item["published_at"])
        return jsonify({"data": result, "count": len(result)})
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if db.is_connected():
            db.close()


# ══════════════════════════════════════════════════════════════
# ENDPOINT 2: Einzelne Rezension mit Typ-spezifischen Details
# GET /api/reviews/42
# ══════════════════════════════════════════════════════════════
@app.get("/api/reviews/<int:review_id>")
def get_review(review_id):
    try:
        db  = get_db()
        cur = db.cursor()

        cur.execute("""
            SELECT r.*, a.name AS author_name
            FROM reviews r
            JOIN authors a ON r.author_id = a.id
                        WHERE r.id = %s
                            AND r.published_at IS NOT NULL
        """, (review_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "Nicht gefunden"}), 404

        review = row_to_dict(cur, row)
        review["published_at"] = str(review.get("published_at", ""))
        review["created_at"]   = str(review.get("created_at", ""))

        detail_table = {
            "buch":  "book_details",
            "film":  "film_details",
            "musik": "music_details",
            "spiel": "game_details"
        }.get(review["media_type"])

        if detail_table:
            cur.execute(f"SELECT * FROM {detail_table} WHERE review_id = %s", (review_id,))
            detail_row = cur.fetchone()
            if detail_row:
                review["details"] = row_to_dict(cur, detail_row)

        return jsonify(review)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if db.is_connected():
            db.close()


# ══════════════════════════════════════════════════════════════
# ENDPOINT 3: Statistiken (für Dashboard / Präsentation)
# GET /api/stats
# ══════════════════════════════════════════════════════════════
@app.get("/api/stats")
def get_stats():
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT
                media_type,
                COUNT(*) AS total,
                ROUND(AVG(rating), 2) AS avg_rating
            FROM reviews
            WHERE published_at IS NOT NULL
            GROUP BY media_type
        """)
        rows = cur.fetchall()
        stats = [row_to_dict(cur, r) for r in rows]
        return jsonify({"stats": stats})
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if db.is_connected():
            db.close()


# ══════════════════════════════════════════════════════════════
# ENDPOINT 4: Suche
# GET /api/search?q=Harry+Potter
# ══════════════════════════════════════════════════════════════
@app.get("/api/search")
def search():
    q = request.args.get("q", "").strip()
    if len(q) < 2:
        return jsonify({"error": "Suchbegriff zu kurz"}), 400

    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT r.id, r.title, r.media_type, r.rating,
                   r.excerpt, a.name AS author_name
            FROM reviews r
            JOIN authors a ON r.author_id = a.id
            WHERE r.published_at IS NOT NULL
              AND (r.title LIKE %s OR r.content LIKE %s)
            LIMIT 20
        """, (f"%{q}%", f"%{q}%"))
        rows = cur.fetchall()
        return jsonify({"data": [row_to_dict(cur, r) for r in rows]})
    except Error as e:
        return jsonify({"error": str(e)}), 500
# ══════════════════════════════════════════════════════════════
# ENDPOINT 5: Neue Rezension hinzufügen
# POST /api/reviews
# ══════════════════════════════════════════════════════════════
@app.post("/api/reviews")
def add_review():
    data = request.get_json()
    if not data or not all(k in data for k in ("title", "category", "rating", "comment")):
        return jsonify({"error": "Fehlende Daten"}), 400

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute("""
            INSERT INTO reviews (title, media_type, rating, excerpt, content, published)
            VALUES (%s, %s, %s, %s, %s, TRUE)
        """, (data["title"], data["category"], data["rating"], data["comment"], data["comment"]))
        db.commit()
        return jsonify({"message": "Rezension hinzugefügt"}), 201
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if db.is_connected():
            db.close()


if __name__ == "__main__":
    print("RoterDorn API läuft auf http://localhost:5000")
    app.run(debug=True, port=5000)