-- ============================================================
-- RoterDorn - Neues Datenbankschema
-- Begründung: Statt alles in wp_posts + wp_postmeta (Key-Value)
-- zu speichern, bekommt jeder Medientyp eine eigene Tabelle.
-- Das ermöglicht typsichere Abfragen, bessere Performance
-- und einfachere Filterung.
-- ============================================================

CREATE DATABASE IF NOT EXISTS roterdorn CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE roterdorn;

-- Autoren / Redakteure
CREATE TABLE authors (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE,
    bio         TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Basis-Tabelle für alle Rezensionen
CREATE TABLE reviews (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author_id    INT UNSIGNED NOT NULL,
    media_type   ENUM('buch','film','musik','spiel') NOT NULL,
    title        VARCHAR(255) NOT NULL,
    content      LONGTEXT NOT NULL,
    excerpt      TEXT,
    rating       DECIMAL(2,1) CHECK (rating BETWEEN 0.0 AND 5.0),
    cover_url    VARCHAR(500),
    published_at DATETIME NULL,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    INDEX idx_media_type (media_type),
    INDEX idx_published_at (published_at)
);

-- Buch-spezifische Felder
CREATE TABLE book_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    isbn            VARCHAR(17),
    page_count      SMALLINT UNSIGNED,
    publisher       VARCHAR(150),
    release_date    DATE,
    language        VARCHAR(50),
    format          VARCHAR(50),
    price           DECIMAL(6,2),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- Film-spezifische Felder
CREATE TABLE film_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    director        VARCHAR(150),
    studio          VARCHAR(150),
    release_year    SMALLINT,
    runtime_minutes SMALLINT UNSIGNED,
    fsk             TINYINT UNSIGNED,
    language        VARCHAR(50),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- Musik-spezifische Felder
CREATE TABLE music_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    artist          VARCHAR(150),
    label           VARCHAR(150),
    release_date    DATE,
    runtime_minutes SMALLINT UNSIGNED,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- Spiel-spezifische Felder
CREATE TABLE game_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    developer       VARCHAR(150),
    publisher       VARCHAR(150),
    release_date    DATE,
    platform        VARCHAR(100),
    genre           VARCHAR(100),
    min_players     TINYINT UNSIGNED,
    max_players     TINYINT UNSIGNED,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- Phase 2 (nicht im MVP): Tags / Schlagwörter (Many-to-Many)
-- CREATE TABLE tags (
--     id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
--     name  VARCHAR(100) UNIQUE NOT NULL,
--     slug  VARCHAR(100) UNIQUE NOT NULL
-- );

-- CREATE TABLE review_tags (
--     review_id INT UNSIGNED NOT NULL,
--     tag_id    INT UNSIGNED NOT NULL,
--     PRIMARY KEY (review_id, tag_id),
--     FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
--     FOREIGN KEY (tag_id)    REFERENCES tags(id)    ON DELETE CASCADE
-- );