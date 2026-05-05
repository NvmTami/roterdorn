-- ── Autoren aus wp_users ─────────────────────────────────────
INSERT INTO authors (id, name, email, bio, created_at)
SELECT
    ID,
    CASE WHEN display_name = 'roterdorn' THEN user_login ELSE display_name END,
    user_email,
    NULL,
    user_registered
FROM wp_users
WHERE ID IN (1, 2, 3);

-- Fallback-Autor für Beiträge mit unbekannter author_id
INSERT INTO authors (id, name, email) VALUES (4, 'Redaktion', NULL)
ON DUPLICATE KEY UPDATE name = name;

-- ── Rezensionen aus wp_posts ──────────────────────────────────
INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, cover_url, published_at, created_at)
SELECT
    p.ID,
    CASE WHEN p.post_author IN (1,2,3,4) THEN p.post_author ELSE 4 END,
    p.post_type,
    p.post_title,
    p.post_content,
    CASE
        WHEN p.post_excerpt != '' THEN p.post_excerpt
        ELSE LEFT(REGEXP_REPLACE(p.post_content, '<[^>]+>', ''), 250)
    END,
    -- Cover-URL aus dem verlinkten Attachment
    (SELECT att.guid
     FROM wp_postmeta tm
     JOIN wp_posts att ON att.ID = tm.meta_value AND att.post_type = 'attachment'
     WHERE tm.post_id = p.ID AND tm.meta_key = '_thumbnail_id'
     LIMIT 1),
    p.post_date,
    p.post_date
FROM wp_posts p
WHERE p.post_type IN ('buch', 'film', 'musik', 'spiel')
  AND p.post_status = 'publish';

-- ── Buchdetails ───────────────────────────────────────────────
INSERT INTO book_details (review_id, isbn, page_count, publisher, release_date, language, format, price)
SELECT
    r.id,
    MAX(CASE WHEN pm.meta_key = 'isbn'              THEN NULLIF(pm.meta_value, '') END),
    MAX(CASE WHEN pm.meta_key = 'seitenzahl'        THEN NULLIF(pm.meta_value, '') END),
    NULL,
    MAX(CASE WHEN pm.meta_key = 'erscheinungsdatum' THEN
        CASE WHEN pm.meta_value REGEXP '^[0-9]{8}$'
             THEN STR_TO_DATE(pm.meta_value, '%Y%m%d')
             ELSE NULL END
    END),
    MAX(CASE WHEN pm.meta_key = 'sprache'   THEN NULLIF(pm.meta_value, '') END),
    MAX(CASE WHEN pm.meta_key = 'buchformat' THEN NULLIF(pm.meta_value, '') END),
    MAX(CASE WHEN pm.meta_key = 'preis'     THEN
        CASE WHEN pm.meta_value REGEXP '^[0-9.,]+$'
             THEN REPLACE(pm.meta_value, ',', '.')
             ELSE NULL END
    END)
FROM reviews r
JOIN wp_posts p ON p.ID = r.id AND p.post_type = 'buch'
LEFT JOIN wp_postmeta pm ON pm.post_id = r.id
    AND pm.meta_key IN ('isbn','seitenzahl','erscheinungsdatum','sprache','buchformat','preis')
GROUP BY r.id;

-- ── Filmdetails ───────────────────────────────────────────────
INSERT INTO film_details (review_id, runtime_minutes, fsk, release_date, language)
SELECT
    r.id,
    MAX(CASE WHEN pm.meta_key = 'filmlaufzeit'      THEN NULLIF(pm.meta_value, '') END),
    MAX(CASE WHEN pm.meta_key = 'fsk'               THEN NULLIF(pm.meta_value, '') END),
    MAX(CASE WHEN pm.meta_key = 'erscheinungsdatum' THEN
        CASE WHEN pm.meta_value REGEXP '^[0-9]{8}$'
             THEN STR_TO_DATE(pm.meta_value, '%Y%m%d')
             ELSE NULL END
    END),
    MAX(CASE WHEN pm.meta_key = 'sprache'           THEN NULLIF(pm.meta_value, '') END)
FROM reviews r
JOIN wp_posts p ON p.ID = r.id AND p.post_type = 'film'
LEFT JOIN wp_postmeta pm ON pm.post_id = r.id
    AND pm.meta_key IN ('filmlaufzeit','fsk','erscheinungsdatum','sprache')
GROUP BY r.id;

-- ── Musikdetails ──────────────────────────────────────────────
INSERT INTO music_details (review_id, release_date, runtime_minutes)
SELECT
    r.id,
    MAX(CASE WHEN pm.meta_key = 'erscheinungsdatum' THEN
        CASE WHEN pm.meta_value REGEXP '^[0-9]{8}$'
             THEN STR_TO_DATE(pm.meta_value, '%Y%m%d')
             ELSE NULL END
    END),
    MAX(CASE WHEN pm.meta_key = 'musiklaufzeit' THEN NULLIF(pm.meta_value, '') END)
FROM reviews r
JOIN wp_posts p ON p.ID = r.id AND p.post_type = 'musik'
LEFT JOIN wp_postmeta pm ON pm.post_id = r.id
    AND pm.meta_key IN ('erscheinungsdatum','musiklaufzeit')
GROUP BY r.id;

-- ── Spieldetails ──────────────────────────────────────────────
INSERT INTO game_details (review_id, release_date)
SELECT
    r.id,
    MAX(CASE WHEN pm.meta_key = 'erscheinungsdatum' THEN
        CASE WHEN pm.meta_value REGEXP '^[0-9]{8}$'
             THEN STR_TO_DATE(pm.meta_value, '%Y%m%d')
             ELSE NULL END
    END)
FROM reviews r
JOIN wp_posts p ON p.ID = r.id AND p.post_type = 'spiel'
LEFT JOIN wp_postmeta pm ON pm.post_id = r.id
    AND pm.meta_key = 'erscheinungsdatum'
GROUP BY r.id;
