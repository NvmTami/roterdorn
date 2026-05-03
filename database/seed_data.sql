-- ============================================================
-- RoterDorn - Seed Daten (MVP Template)
--
-- Voraussetzung:
--   schema_new.sql wurde vorher ausgefuehrt (Tabellen existieren).
--
-- Inhalt:
--   - 4 Autoren
--   - 8 vollstaendig ausgefuellte Rezensionen (2 pro media_type)
--   - 12 auskommentierte TODO-Skelette (3 pro media_type)
--
-- Hinweise fuer das Team:
--   - HTML im content-Feld bleibt erhalten und wird im Frontend
--     via [innerHTML] + DomSanitizer gerendert.
--   - Einfache Anfuehrungszeichen (') werden als '' escaped:
--       'Pratchett''s Welt'   -> Pratchett's Welt
--   - Reihenfolge der INSERTs ist relevant wegen Foreign Keys:
--       authors -> reviews -> *_details
--   - Nicht jeder Eintrag braucht alle Detail-Felder. NULL ist OK.
-- ============================================================

USE roterdorn;

-- Optional: Bei Re-Runs vorhandene Daten loeschen.
-- Bei frischem Schema kann der Block ignoriert werden.
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE book_details;
-- TRUNCATE TABLE film_details;
-- TRUNCATE TABLE music_details;
-- TRUNCATE TABLE game_details;
-- TRUNCATE TABLE reviews;
-- TRUNCATE TABLE authors;
-- SET FOREIGN_KEY_CHECKS = 1;


-- ============================================================
-- 1. AUTHORS
-- ============================================================
INSERT INTO authors (id, name, email, bio) VALUES
(1, 'Joanna Mueller-Lenz', 'j.lenc@roterdorn.de',
 'Tanzt auf mehreren Hochzeiten gleichzeitig. Wenn sie nicht gerade als Lehrerin arbeitet, schreibt sie fuer die Redaktion oder steht auf der Buehne.'),
(2, 'Marcus Pohlmann', 'm.pohlmann@roterdorn.de',
 'Chefredakteur fuer Brett-, Karten- und Rollenspiele sowie Tabletop. Ueber 20 Jahre Erfahrung in der Spieleszene.'),
(3, 'Martin Wagner', 'm.wagner@roterdorn.de',
 'Buchliebhaber mit Schwerpunkt Belletristik und Krimi.'),
(4, 'Leonardo Beckert', 'l.beckert@roterdorn.de',
 'Filmkritiker mit Faible fuer anspruchsvolles Kino und Independent-Produktionen.');


-- ============================================================
-- 2. REVIEWS (Basis-Tabelle)
-- ============================================================

-- ---------- BUCH ----------
INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES
(1, 1, 'buch',
 'Spiel mir das Lied vom Goblin',
 '<p>Der Tag, an dem Terry Pratchett starb, war ein schwarzer Tag fuer die Fantasyliteratur. Der Meister der Fussnoten hat eine grosse Luecke hinterlassen, die gefuellt werden moechte, aber doch niemanden findet, der wuerdig genug ist.</p>\r\n<h2>Von Goblinfruechten und gestohlenen Folianten</h2>\r\n<p>Hauptrolle in der Geschichte voller geheimnisvoller Goblinfruechte ist die Farmerin Isabella Nagg. Sie ist ungluecklich verheiratet, spricht mit ihrem Basilikum und raeumt staendig ihrem Mann hinterher.</p>\r\n<p>Insgesamt liest sich <strong>Spiel mir das Lied vom Goblin</strong> recht holprig. Die Charaktere bieten nicht genug Tiefe, um wirklich Naehe zu erzeugen.</p>',
 'Oliver Darkshires Versuch, in Pratchetts Fussstapfen zu treten, bleibt blass. Viel Potential, aber wenig Naehe.',
 3.0,
 'https://www.roterdorn.de/wp-content/uploads/2026/05/SpielMirDasLiedVomGoblin-188x300.jpg',
 '2026-05-02 10:00:00'),

(2, 1, 'buch',
 'Der Fall Charles Dexter Ward',
 '<p>Tatsaechlich schon den neunten Teil der Vertonungen der Geschichten von H.P. Lovecraft legen <em>LPL Records</em> nun mit <strong>Der Fall Charles Dexter Ward</strong> vor. Hierbei handelt es sich wohl um Lovecrafts laengste Erzaehlung.</p>\r\n<h2>Eine duestere Lebensgeschichte</h2>\r\n<p>Wie am Titel unschwer zu erkennen, erzaehlt die Geschichte das Leben des Charles Dexter Ward, einem exzentrischen jungen Mann, der sich fuer Altertumskunde und spaeter auch fuer abseitigere Themen interessiert.</p>\r\n<p>Fuer Freunde des Werkes von H. P. Lovecraft ein Pflichtkauf. Auch fuer Liebhaber des anspruchsvollen Gruselns sicherlich interessant.</p>',
 'LPL Records vertont Lovecrafts laengste Erzaehlung mit David Nathan als Sprecher. Atmosphaerisch und packend.',
 4.5,
 'https://placehold.co/300x400/0a0a0a/c0392b?text=Charles+Dexter+Ward',
 '2016-02-17 15:38:54'),

-- ---------- FILM ----------
(3, 4, 'film',
 '8 Blickwinkel',
 '<p>Um gleich am Anfang etwas aufzuklaeren: dass der versprochene Inhalt (8 Blickwinkel) nicht eingehalten wird, liegt am deutschen Verleihtitel. Im Original heisst der Film naemlich <em>Vantage Point</em> und bezieht sich eher auf die unterschiedlichen Perspektiven.</p>\r\n<h2>Spannung mit Wiederholungen</h2>\r\n<p>Der Film erzaehlt das gleiche Ereignis - einen Anschlag auf den US-Praesidenten - aus mehreren Perspektiven. Was in der Theorie spannend klingt, wird im Verlauf des Films zunehmend ermuedend.</p>',
 'Spannungs-Thriller mit interessantem Konzept, dessen Wiederholungen aber mehr ermueden als fesseln.',
 3.5,
 'https://www.roterdorn.de/wp-content/uploads/2026/04/99378_poster_gross-208x300.jpg',
 '2026-04-13 09:00:00'),

(4, 1, 'film',
 'Star Wars: Das Erwachen der Macht',
 '<p><strong>Star Wars</strong> kommt wieder ins Kino! Endlich! Ich konnte es kaum erwarten, habe gleich als Erste vorbestellt und mich geweigert, vorab irgendetwas mitbekommen zu wollen.</p>\r\n<h2>Gut gegen Boese - Der Widerstand gegen die Erste Ordnung</h2>\r\n<p>Nachdem das Gleichgewicht der Macht wiederhergestellt wurde und das Boese besiegt zu sein schien, verschwand Luke Skywalker. Die Ueberreste des Imperiums schoepften dadurch neue Kraft und formierten sich neu.</p>\r\n<p>Episode VII hat tatsaechlich etwas von <em>Heimkommen</em>. Alles was im Prequel falsch gemacht wurde, haben die Macher hier wieder gerade gerueckt. <strong>Chewie, wir sind zu Hause!</strong></p>',
 'Episode VII bringt das alte Star-Wars-Gefuehl zurueck. Etwas viel Wiederholung, aber ein gelungenes Comeback.',
 4.0,
 'https://placehold.co/300x400/0a0a0a/c0392b?text=Star+Wars+VII',
 '2015-12-20 20:20:47'),

-- ---------- MUSIK ----------
(5, 2, 'musik',
 'Fix8:Sed8 - Secret Gig',
 '<p>Ganze vier Jahre ist es bereits her, dass <strong>Fix8:Sed8</strong> mit <em>The Inevitable Relapse</em> ihr letztes Album veroeffentlicht haben.</p>\r\n<p>Die dazugehoerigen Auftritte waren sowohl musikalisch als auch optisch recht eindrucksvoll - daher fand ich die lange Pause umso bedauerlicher.</p>\r\n<p>Das Secret Gig hat die Wartezeit mehr als wettgemacht und zeigt eindrucksvoll: die Band hat nichts von ihrer duesteren Intensitaet verloren.</p>',
 'Nach vier Jahren Pause kehrt das deutsche Industrial-Duo mit voller Wucht zurueck. Pflichttermin fuer Fans.',
 4.5,
 'https://www.roterdorn.de/wp-content/uploads/2025/09/Fix_01-150x243.jpg',
 '2025-09-21 18:00:00'),

(6, 2, 'musik',
 'Madness - C''est la Vie',
 '<p>Mit <strong>C''est la Vie</strong> liefert <em>Madness</em> ein neues Album voller charakteristischer Ska-Pop-Klaenge ab.</p>\r\n<p>Auch nach Jahrzehnten im Geschaeft beweisen die britischen Veteranen, dass sie noch lange nicht zum alten Eisen gehoeren.</p>',
 'Die britischen Ska-Veteranen liefern ein neues Album voller alter Tugenden und frischer Ideen.',
 4.0,
 'https://www.roterdorn.de/wp-content/uploads/2024/06/Madness-Cest-la-Vie-50x50.jpg',
 '2024-06-02 12:00:00'),

-- ---------- SPIEL ----------
(7, 2, 'spiel',
 'Shadow Cards',
 '<p>Wenn es um Stichspiele geht, ist bei meinen Spielrunden <em>Wizard</em> eigentlich immer die erste Wahl. Dennoch gibt es Neuerscheinungen in diesem Genre, die Aufmerksamkeit erregen.</p>\r\n<h2>Stiche im Schatten</h2>\r\n<p>So war es auch bei <strong>Shadow Cards</strong> der Fall. Das Spiel ueberzeugt mit cleveren Mechaniken und einer angenehm kurzen Spielzeit.</p>',
 'Cleveres Stichspiel mit kurzer Spielzeit. Eine echte Alternative zu Wizard.',
 4.0,
 'https://www.roterdorn.de/wp-content/uploads/2026/04/Shadow-Cards-234x300.jpg',
 '2026-04-17 14:00:00'),

(8, 2, 'spiel',
 'Rumms - Voll auf die Krone',
 '<p>Mit <strong>Rumms</strong> veroeffentlicht der Stuttgarter Spieleverlag <em>Kosmos</em> ein Wuerfelspiel der etwas anderen Art.</p>\r\n<p>Hier muessen die bis zu vier Spieler nicht, wie gewohnt, Symbole oder Zahlen erwuerfeln, stattdessen versuchen sie in zwei Teams - den Drachen- und den Loewenrittern - die gegnerischen Wuerfel durch geschicktes Schnicken vom Spielfeld zu befoerdern.</p>\r\n<p><em>Kosmos</em> legt hier ein schoenes Familienspiel vor, das sich fuer alle Altersgruppen eignet und fuer kurzweilige, unkomplizierte Unterhaltung auf dem Spieltisch sorgt.</p>',
 'Wuerfel-Schnipp-Spiel von Kosmos fuer die ganze Familie. Einfach, kurzweilig, gut.',
 4.0,
 'https://placehold.co/300x400/0a0a0a/c0392b?text=Rumms',
 '2016-01-07 16:38:46');


-- ============================================================
-- 3. BOOK DETAILS
-- ============================================================
INSERT INTO book_details (review_id, isbn, page_count, publisher, release_date, language, format, price) VALUES
(1, '978-3-453-32219-1', 480, 'Heyne',       '2025-09-01', 'Deutsch', 'Hardcover', 24.00),
(2, '978-3-9819-1234-5', NULL, 'LPL Records', '2016-01-15', 'Deutsch', 'Hoerbuch',  22.99);


-- ============================================================
-- 4. FILM DETAILS
-- ============================================================
INSERT INTO film_details (review_id, director, studio, release_year, runtime_minutes, fsk, language) VALUES
(3, 'Pete Travis',  'Sony Pictures', 2008,  90, 16, 'Deutsch'),
(4, 'J.J. Abrams',  'Lucasfilm',     2015, 138, 12, 'Deutsch');


-- ============================================================
-- 5. MUSIC DETAILS
-- ============================================================
INSERT INTO music_details (review_id, artist, label, release_date, runtime_minutes) VALUES
(5, 'Fix8:Sed8', 'aufnahme + wiedergabe', '2025-09-15', 75),
(6, 'Madness',   'BMG',                   '2024-05-31', 48);


-- ============================================================
-- 6. GAME DETAILS
-- ============================================================
INSERT INTO game_details (review_id, developer, publisher, release_date, platform, genre, min_players, max_players) VALUES
(7, 'Frank Crittin', 'AMIGO',  '2026-03-01', 'Brettspiel', 'Stichspiel',  3, 5),
(8, NULL,            'Kosmos', '2016-01-01', 'Brettspiel', 'Wuerfelspiel', 2, 4);


-- ============================================================
-- 7. TODO - SKELETTE
--
-- Anweisung: Pro media_type 3 weitere Eintraege hinzufuegen
-- (Zeilen entkommentieren, IDs ab 9 fortlaufend, Daten anpassen).
-- Vergesst nicht jeweils auch den passenden *_details-Eintrag.
-- ============================================================

-- ---------- BUCH (TODO 9, 10, 11) ----------
-- INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES
-- ( 9, 3, 'buch', 'TODO Buchtitel', '<p>TODO Volltext mit HTML.</p>', 'TODO Kurzbeschreibung.', 4.0, 'https://placehold.co/300x400', '2026-01-01 10:00:00');
-- INSERT INTO book_details (review_id, isbn, page_count, publisher, release_date, language, format, price) VALUES
-- ( 9, 'TODO-ISBN', NULL, 'TODO Verlag', '2026-01-01', 'Deutsch', 'Taschenbuch', NULL);
--
-- (10, ...)
-- (11, ...)


-- ---------- FILM (TODO 12, 13, 14) ----------
-- INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES
-- (12, 4, 'film', 'TODO Filmtitel', '<p>TODO Volltext mit HTML.</p>', 'TODO Kurzbeschreibung.', 4.0, 'https://placehold.co/300x400', '2026-01-01 10:00:00');
-- INSERT INTO film_details (review_id, director, studio, release_year, runtime_minutes, fsk, language) VALUES
-- (12, 'TODO Regie', 'TODO Studio', 2024, 120, 12, 'Deutsch');
--
-- (13, ...)
-- (14, ...)


-- ---------- MUSIK (TODO 15, 16, 17) ----------
-- INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES
-- (15, 2, 'musik', 'TODO Album', '<p>TODO Volltext mit HTML.</p>', 'TODO Kurzbeschreibung.', 4.0, 'https://placehold.co/300x400', '2026-01-01 10:00:00');
-- INSERT INTO music_details (review_id, artist, label, release_date, runtime_minutes) VALUES
-- (15, 'TODO Kuenstler', 'TODO Label', '2026-01-01', 45);
--
-- (16, ...)
-- (17, ...)


-- ---------- SPIEL (TODO 18, 19, 20) ----------
-- INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES
-- (18, 2, 'spiel', 'TODO Spieltitel', '<p>TODO Volltext mit HTML.</p>', 'TODO Kurzbeschreibung.', 4.0, 'https://placehold.co/300x400', '2026-01-01 10:00:00');
-- INSERT INTO game_details (review_id, developer, publisher, release_date, platform, genre, min_players, max_players) VALUES
-- (18, 'TODO Entwickler', 'TODO Verlag', '2026-01-01', 'Brettspiel', 'TODO Genre', 2, 4);
--
-- (19, ...)
-- (20, ...)
