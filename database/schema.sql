CREATE TABLE IF NOT EXISTS authors (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE,
    bio         TEXT,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
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

CREATE TABLE IF NOT EXISTS book_details (
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

CREATE TABLE IF NOT EXISTS film_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    director        VARCHAR(150),
    studio          VARCHAR(150),
    release_year    SMALLINT,
    runtime_minutes SMALLINT UNSIGNED,
    fsk             TINYINT UNSIGNED,
    language        VARCHAR(50),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS music_details (
    review_id       INT UNSIGNED PRIMARY KEY,
    artist          VARCHAR(150),
    label           VARCHAR(150),
    release_date    DATE,
    runtime_minutes SMALLINT UNSIGNED,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS game_details (
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
