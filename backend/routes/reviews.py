from flask import Blueprint, jsonify, request
from mysql.connector import Error
from db import get_db, row_to_dict

reviews_bp = Blueprint("reviews", __name__, url_prefix="/api")

# Whitelist für typ-spezifische Detail-Tabellen (verhindert SQL-Injection)
DETAIL_TABLES = {
    "buch":  "book_details",
    "film":  "film_details",
    "musik": "music_details",
    "spiel": "game_details",
}

VALID_MEDIA_TYPES = set(DETAIL_TABLES.keys())


# ── GET /api/reviews ─────────────────────────────────────────
@reviews_bp.get("/reviews")
def get_reviews():
    media_type = request.args.get("type")
    limit      = int(request.args.get("limit", 20))
    page       = int(request.args.get("page", 1))
    offset     = (page - 1) * limit

    query = """
        SELECT r.id, r.title, r.media_type, r.rating,
               r.excerpt, r.published_at, r.cover_url,
               a.name AS author_name
        FROM reviews r
        JOIN authors a ON r.author_id = a.id
        WHERE r.published_at IS NOT NULL
    """
    params = []

    if media_type and media_type in VALID_MEDIA_TYPES:
        query += " AND r.media_type = %s"
        params.append(media_type)

    query += " ORDER BY r.published_at DESC LIMIT %s OFFSET %s"
    params.extend([limit, offset])

    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute(query, params)
        rows   = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("published_at"):
                item["published_at"] = str(item["published_at"])
        return jsonify({"data": result, "count": len(result)})
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()


# ── GET /api/reviews/<id> ────────────────────────────────────
@reviews_bp.get("/reviews/<int:review_id>")
def get_review(review_id):
    db = None
    try:
        db  = get_db()
        cur = db.cursor()

        cur.execute("""
            SELECT r.*, a.name AS author_name
            FROM reviews r
            JOIN authors a ON r.author_id = a.id
            WHERE r.id = %s AND r.published_at IS NOT NULL
        """, (review_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({"error": "Nicht gefunden"}), 404

        review = row_to_dict(cur, row)
        review["published_at"] = str(review.get("published_at", ""))
        review["created_at"]   = str(review.get("created_at", ""))

        detail_table = DETAIL_TABLES.get(review.get("media_type"))
        if detail_table:
            # Tabellenname kommt aus einer Whitelist — kein Injection-Risiko
            cur.execute(f"SELECT * FROM {detail_table} WHERE review_id = %s", (review_id,))
            detail_row = cur.fetchone()
            if detail_row:
                review["details"] = row_to_dict(cur, detail_row)

        return jsonify(review)
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()


# ── GET /api/stats ───────────────────────────────────────────
@reviews_bp.get("/stats")
def get_stats():
    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT media_type,
                   COUNT(*) AS total,
                   ROUND(AVG(rating), 2) AS avg_rating
            FROM reviews
            WHERE published_at IS NOT NULL
            GROUP BY media_type
        """)
        rows = cur.fetchall()
        return jsonify({"stats": [row_to_dict(cur, r) for r in rows]})
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()


# ── GET /api/search ──────────────────────────────────────────
@reviews_bp.get("/search")
def search():
    q = request.args.get("q", "").strip()
    if len(q) < 2:
        return jsonify({"error": "Suchbegriff zu kurz"}), 400

    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            SELECT r.id, r.title, r.media_type, r.rating,
                   r.excerpt, r.cover_url, r.published_at, a.name AS author_name
            FROM reviews r
            JOIN authors a ON r.author_id = a.id
            WHERE r.published_at IS NOT NULL
              AND (r.title LIKE %s OR r.content LIKE %s)
            LIMIT 20
        """, (f"%{q}%", f"%{q}%"))
        rows = cur.fetchall()
        result = [row_to_dict(cur, r) for r in rows]
        for item in result:
            if item.get("published_at"):
                item["published_at"] = str(item["published_at"])
        return jsonify({"data": result})
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()


# ── POST /api/reviews ────────────────────────────────────────
@reviews_bp.post("/reviews")
def add_review():
    data = request.get_json(silent=True)
    if not data or not all(k in data for k in ("title", "category", "rating", "comment")):
        return jsonify({"error": "Fehlende Felder: title, category, rating, comment"}), 400

    if data["category"] not in VALID_MEDIA_TYPES:
        return jsonify({"error": "Ungültige Kategorie"}), 400

    rating = data["rating"]
    if not isinstance(rating, (int, float)) or not (1 <= rating <= 5):
        return jsonify({"error": "Rating muss zwischen 1 und 5 liegen"}), 400

    db = None
    try:
        db  = get_db()
        cur = db.cursor()
        cur.execute("""
            INSERT INTO reviews (title, media_type, rating, excerpt, content, published_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
        """, (data["title"], data["category"], rating, data["comment"], data["comment"]))
        db.commit()
        return jsonify({"message": "Rezension hinzugefügt", "id": cur.lastrowid}), 201
    except Error as e:
        return jsonify({"error": "Datenbankfehler"}), 500
    finally:
        if db and db.is_connected():
            db.close()
