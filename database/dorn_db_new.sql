-- ============================================================
-- RoterDorn - Seed-Daten (echte Inhalte aus dorn_db_original.sql)
-- Schema:    dorn_db_schema_new.sql
-- Auswahl:   6 Musik · 3 Film · 6 Buch · 12 Spiel  = 27 Rezensionen
-- ============================================================

USE roterdorn;

-- ============================================================
-- Autoren
-- ============================================================

INSERT INTO authors (id, name, email, bio) VALUES
(1, 'roterdorn',          'redaktion@roterdorn.de', 'Redaktion von roterdorn.de'),
(2, 'Marcus Pohlmann',    'm.pohlmann@roterdorn.de', 'Redakteur und Hauptrezensent. Schwerpunkte: Spiele, Musik, Bücher.'),
(3, 'Joanna Müller-Lenz', 'joanna@lenc.de',          'Autorin bei roterdorn.de. Schwerpunkt: Film.');

-- ============================================================
-- Rezensionen
-- ============================================================

INSERT INTO reviews (id, author_id, media_type, title, content, excerpt, rating, cover_url, published_at) VALUES

-- Musik (IDs 1–6)
(1, 2, 'musik', 'Frogbelly And Symphony - The Eye',
 'Hinter dem etwas sperrigen Namen Frogbelly And Symphony verbirgt sich eine vierköpfige britisch-amerikanische Band, die nun mit The Eye ihre erste Veröffentlichung vorlegt. Auf Labelship erschienen übernehmen die Hamburger von Broken Silence den Vertrieb der EP in unseren heimischen Gefilden. Die sechs Tracks sind sowohl auf CD als auch, für die Traditionalisten, auf Vinyl erhältlich und kommen im schmucken Digi-Pack. Schepperndes Schlagzeug leitet den Opener „Amour Fou" ein und gibt auch für den Rest des Songs die Marschrichtung vor, lediglich der Gesang von Liz Hanley, zeitweise verstärkt durch Thomas Lebioda, kann dem Schlagwerk Paroli bieten. Eine feste Linie oder ein Konzept sucht der Hörer bei The Eye vergeblich. Die Band zeigt sich bei den sechs Liedern sehr vielseitig und entzieht sich so jedem Versuch, sie in eine bestimmte Schublade zu packen. Pop, Rock, Punk, Metal und Easy Listening werden wild durcheinander gemischt und zu einem, erstaunlicherweise, funktionierenden Ganzen vermengt.',
 'Interessante, spannende Musik, die sich jeder Klassifizierung entzieht und neugierig auf mehr Material macht.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/TheEye.jpg', '2013-08-18 19:09:25'),

(2, 2, 'musik', 'Folk''s Sake - Best Of Live',
 'Ich muss zugeben das, bevor ihr Album Best Of Live auf meinem Schreibtisch landete, ich noch nie etwas von der Berliner Irish-Folk-Band Folk''s Sake gehört hatte. Dies mag natürlich daran liegen, dass die Band bisher erst eine EP veröffentlicht hat und hauptsächlich in der Hauptstadt und deren Umland tourt. Umso gespannter war ich, als ich das Album, das von Prosodia/MSP-Music veröffentlicht wird, in den Player legte. Den Anfang macht das Instrumental-Stück „Kerry Tunes", das recht langsam anfängt und im weiteren Verlauf deutlich an Geschwindigkeit zunimmt. Hier bekommt der Hörer schon eine recht gute Vorstellung, was ihn in den nächsten rund 60 Minuten erwartet: Traditionelle irische Musik mit Geige, Gitarre, Percussion und ohne neumodische Spielereien. Eine interessante Besonderheit der Band ist der häufig mehrstimmige Gesang, der den Stücken eine neue Facette gibt.',
 'Der Hörer bekommt mit dem Best Of Live-Album der Berliner Band im besten Sinne des Wortes traditionelles Liedgut ohne neumodische Spielereien geboten.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Folks-Sake.jpg', '2014-10-24 12:11:29'),

(3, 2, 'musik', 'The Birthday Massacre - Imaginary Monsters',
 'Gut ein Jahr nach der Veröffentlichung ihres letzten regulären Albums Pins And Needles veröffentlicht das kanadische Sextett The Birthday Massacre die EP Imaginary Monsters. Darauf hat ihr Plattenlabel Out Of Line einige Stücke gepackt, die es aus Platzmangel nicht mehr auf das Album geschafft haben, sowie einige Remixe schon bekannter Stücke und um das Ganze abzurunden gibt es auch noch ein Musikvideo dazu. Zarte, melodische Keyboards dominieren das erste Stück „Forever". Zusammen mit der gefälligen Stimme von Sängerin Chibi könnte der Track als beliebige Pop-Nummer durchgehen, wären nicht die punktuell eingesetzten Gitarren, die für einen Gegenpol sorgen und dem Stück die nötige Spannung verleihen. The Birthday Massacre liefern auf Imaginary Monsters eine sehr gefällige Mischung aus poppigen Melodien, rockigen Gitarrenriffs und ausdrucksvollem Gesang.',
 'Out Of Line veröffentlichen hier eine nette, kleine EP bei welcher der Liebhaber der eher düsteren elektronischen Musik nahezu bedenkenlos zugreifen kann.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Birthday-Massacre-Monsters.jpg', '2012-03-10 13:52:08'),

(4, 2, 'musik', 'The Eden House - Timeflows',
 'Die hierzulande nur wenig bekannte britische Gothic-Band The Eden House kann ein ausgesprochen illustres Line-Up vorweisen, so finden sich hier beispielsweise Mitglieder der Fields Of The Nephilim, The Mission oder auch NFD, die mit wechselnden Gastmusikern und -sängerinnen arbeiten. Nach einigen Festival-Gigs im letzten Jahr sollte die Band eigentlich mit ihrer neuen EP Timeflows im Gepäck Anfang diesen Jahres auf ausgedehnte Deutschland-Tour gehen. Leider mussten die Konzerte kurzfristig abgesagt werden und so bleibt dem geneigten Hörer nichts anderes übrig, als sich mit den fünf Tracks der EP die Wartezeit auf das demnächst erscheinende Album Half-Life zu verkürzen. Das erste Stück „Neversea" macht vom ersten Takt an klar, wohin die musikalische Reise gehen wird: Rockige Gitarren, druckvolles Schlagzeug und dominante Bassläufe geben den Ton an.',
 'The Eden House legen hier ein interessantes, trotz der kurzen Laufzeit vielseitiges Stück Musik vor, bei dem der aufmerksame Hörer immer wieder neue Facetten entdecken kann.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Eden-House-Timeflows.jpg', '2013-05-15 15:05:18'),

(5, 2, 'musik', 'Liz Hanley - The Ecstasy Of St. Cécilia',
 'Die irische Folk-Musik dient weltweit unzähligen Bands und Solo-Künstlern als nahezu unerschöpfliches Füllhorn aus dem sie sich nach Belieben bedienen können. Auch Liz Hanley, eine irisch-stämmige New Yorkerin, die in mehreren anderen Bands aktiv ist, hat sich für ihr, von Labelship veröffentlichtes, Debut-Album The Ecstasy Of St. Cecilia aus dem Liedgut ihrer Vorfahren einige Stücke ausgesucht. Sie hat sich dabei für die eher düster-morbide Seite der irischen Volks-Musik entschieden und so drehen sich die meisten Stücke um Krieg, Revolution und Totschlag. Das erste Stück des Albums, „Bodenstown Churchyard", als spärlich instrumentiert zu bezeichnen, wäre eine glatte Übertreibung. Nur mit ihrer, leicht spröden, Stimme trägt Frau Hanley das Stück über einen toten Freiheitskämpfer. Insgesamt hinterlässt das Album den Eindruck einer ungewöhnlichen, aber durchaus hörenswerten Künstlerin.',
 'Ungewöhnliche, aber durchaus hörenswerte Interpretation teils bekannten, teils obskuren irischen Liedgutes.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Liz-Hanley-Ecstasy.jpg', '2013-08-11 15:39:15'),

(6, 2, 'musik', 'Sally Dige - Hard To Please',
 'Eher zufällig bin ich bei einem Konzertbesuch auf Sally Dige aufmerksam geworden, die vor kurzem im Vorprogramm von Lebanon Hanover in Darmstadt zu hören war. Nach der Beteiligung an verschiedenen Kunst-Projekten legt die in Berlin lebende Kanadierin mit Hard To Please nun ihr Debütalbum vor. Die CD mit ihren acht Tracks kommt im Pappschuber und wird vom kleinen Glasgower Label Night School Records veröffentlicht. Der Opener „Hard To Please" bietet klassischen, emotionslosen Synthie-Pop/New Wave, wie er Mitte der 80er Jahre des letzten Jahrhunderts, vor allem in Großbritannien, gespielt wurde. Dazu passen die, teils mehrfach übereinander gemixten, Vocals die Frau Dige mal sehr fragil, dann aber wieder recht energisch zeigen. Sally Dige gelingt es recht gut, die unüberhörbaren Einflüsse zu etwas Eigenständigem zu verarbeiten und dem Album eine individuelle Note zu geben.',
 'Wer unterkühlte elektronische Klänge, Retro-Sound und abwechslungsreiche weibliche Vocals schätzt wird von Hard To Please sicherlich nicht enttäuscht werden.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Sally-Dige.jpg', '2016-04-10 09:40:38'),

-- Film (IDs 7–9)
(7, 3, 'film', 'Der Marsianer - Rettet Mark Watney',
 'Mit Der Marsianer #RettetMarkWatney kommt ein SciFi-Nerd-Thriller auf die Leinwand. Mark Watney (Matt Damon) ist einer von 6 NASA-Astronauten, die auf dem Mars Forschungen betreiben. Nach einem starken Sturm wird Watney von umherfliegenden Trümmern getroffen und von der Mannschaft getrennt. Diese glaubt ihn für tot und so brechen sie ihre Mission nur zu fünft ab. Was jedoch niemand weiß: Watney hatte Glück und überlebte den Zwischenfall. Angeschlagen kämpft er sich zurück auf die Station, wo er sich zunächst selbst verarztet. Als Botaniker verfügt er über genug Wissen, um zumindest das Nahrungsproblem zu lösen. Wenn Ridley Scott als Regisseur für einen Science-Fiction-Streifen herhalten muss, denke ich automatisch an „Alien", bei Der Marsianer ist aber die Thematik so weit von Außerirdischen entfernt wie der Mars von der Erde. Tatsächlich handelt es sich hier um ein recht realistisches Szenario.',
 'Insgesamt hat mir der Marsianer sehr gefallen – ein netter Film mit sehr klugen Ansätzen und genug Spannung, um nicht langweilig zu werden.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/marsianer1.jpg', '2015-10-09 16:57:03'),

(8, 3, 'film', 'Star Wars: Das Erwachen der Macht',
 'Mit Das Erwachen der Macht kehrt das Star-Wars-Universum nach einer langen Pause auf die Leinwand zurück. Regisseur J.J. Abrams setzt dabei auf Vertrautheit: Die Struktur des Films erinnert stark an Episode IV, bietet aber mit Rey, Finn und Kylo Ren starke neue Charaktere. Die Rückkehr von Han Solo, Leia und Luke sorgt für nostalgische Momente, während die neue Generation das Franchise in die Zukunft führt. Die Spezialeffekte sind atemberaubend, das Tempo stimmt und die Chemie zwischen den neuen Hauptdarstellern überzeugt von der ersten Szene an. Die Fangemeinde wartete zehn Jahre auf diesen Film – und wurde nicht enttäuscht. Abrams schafft den Spagat zwischen Hommage und Neuerfindung, auch wenn der Film strukturell sehr stark an A New Hope angelehnt ist.',
 'Ein würdiger Neustart für das Star-Wars-Universum mit starken neuen Charakteren und einem guten Gleichgewicht zwischen Nostalgie und Aufbruch.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/filmplakat.jpg', '2015-12-20 00:00:00'),

(9, 3, 'film', 'Seventh Son',
 'Mit Seventh Son hat Regisseur Sergei Bodrov einen ambitionierten Fantasy-Film auf die Leinwand gebracht, der auf der Buchserie The Wardstone Chronicles von Joseph Delaney basiert. Jeff Bridges spielt den erfahrenen Geisterjäger Meister Gregory, der den jungen Tom Ward (Ben Barnes) als seinen neuen Lehrling aufnimmt. Gemeinsam müssen sie die wiedererstandene Hexenkönigin Mutter Malkin (Julianne Moore) aufhalten. Der Film bietet solide Action-Sequenzen und beeindruckende Schauplätze sowie aufwendige Spezialeffekte. Leider verliert er sich manchmal in den Klischees des Genres und lässt die Charakterentwicklung etwas zu kurz kommen. Jeff Bridges spielt seinen Part mit gewohnter Lässigkeit, Ben Barnes als Schüler bleibt jedoch blass.',
 'Ein solider Fantasy-Film mit beeindruckenden Kulissen und gutem Cast, der sich jedoch nicht ganz von den Genre-Klischees befreien kann.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Seventh-Son.jpg', '2015-03-11 00:00:00'),

-- Buch (IDs 10–15)
(10, 2, 'buch', 'Stitched - Die lebenden Toten - Band 1',
 'Der umtriebige Comic-Autor Garth Ennis ist dafür bekannt (und berüchtigt) Themen aufzugreifen, denen eigentlich kaum noch neue Aspekte abzugewinnen sind und diese gehörig durch den Wolf zu drehen. Für sein neuestes Werk Stitched hat sich der Autor nun den Zombies angenommen und versucht auch dieser, weitgehend ausgereizten, Thematik eine neue Facette hinzuzufügen. Veröffentlicht wird der 180 Seiten starke Softcover-Band wieder von Panini Comics. Die Geschichte beginnt mit dem Absturz eines US-amerikanischen Armee-Hubschraubers im Osten Afghanistans, bei dem sich zwei Frauen und ein schwerverletzter Mann aus den Trümmern retten können. Ohne nennenswerte Ausrüstung, keine Möglichkeit zur Kommunikation mit der Außenwelt und tief im feindlichen Territorium machen sich die drei Soldaten auf den Weg zurück zum nächsten sicheren Lager. Die Verbindung von Taliban, Afghanistan und übernatürlicher Bedrohung ist nicht ganz neu, doch Ennis versteht es, die verschiedenen Versatzstücke zu einem funktionierenden, unterhaltsamen und spannenden Ganzen zusammenzufügen.',
 'Stitched bietet eine vielversprechende Variation des Zombie-Themas, interessante Charaktere und eine spannende Handlung ohne dabei auf zu viele Klischees zurückgreifen zu müssen.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Stitched.jpg', '2013-06-25 18:58:57'),

(11, 2, 'buch', 'Soylent Green',
 'Viele Leser denken bei dem Namen Soylent Green vor allem an den Film aus dem Jahr 1973 mit Charlton Heston und Edward G. Robinson in den Hauptrollen. Dass dieser Film jedoch weite Teile seines Hintergrundes aus dem Roman Make Room! Make Room! von Harry Harrison zieht, ist dagegen deutlich weniger bekannt. Fast 50 Jahre nach der Erstveröffentlichung dieses SciFi-Klassikers hat sich der Mantikore Verlag daran gemacht eine neue Übersetzung anzufertigen und das vergriffene Buch unter dem bekannteren Namen Soylent Green wieder auf den deutschen Markt zu bringen. Im Jahr 1999 sind die Rohstoffressourcen des Planeten fast völlig ausgebeutet, das Bevölkerungswachstum ist völlig außer Kontrolle geraten und der Klimawandel macht den Menschen das Leben schwer. New York, Schauplatz des Romans, ist zu einem gewaltigen Moloch mit über 35 Millionen Einwohnern angewachsen.',
 'Eine düstere, beklemmende Zukunftsvision, bei der Geschichte und Charaktere eher schmückendes Beiwerk sind.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Soylent-Green.jpg', '2013-12-18 20:39:10'),

(12, 2, 'buch', 'Cthulhu Design',
 'Im letzten Jahr ging mit dem Ausstieg des langjährigen Chefredakteurs Frank Heller zweifellos eine Ära für das Rollenspiel H.P. Lovecrafts Cthulhu zu Ende. Ein wenig ging dabei allerdings unter, dass noch jemand anderes seinen Abschied aus dem Team nahm. Die Rede ist hier von Manfred Escher, dem Designer, der das Erscheinungsbild der Veröffentlichungen seit vielen Jahren maßgeblich geprägt hat und dessen Illustrationen fast jedes Cover zieren, das in den letzten zehn Jahren von Pegasus Press für das Rollenspiel veröffentlicht wurde. Quasi als Abschiedsgeschenk veröffentlicht er nun im Selbstverlag Cthulhu Design, das alle Arbeiten aus diesem Bereich zusammenfasst. Ein Blick auf den Umschlag vermittelt dem Leser schon, was ihn erwartet: Sämtliche Rückenabbildungen der Rollenspiel-Bände sind hier aneinander gereiht. Das Hauptaugenmerk liegt auf den Covern der Regel-, Quellen- und Abenteuer-Bände.',
 'Eine rundum gelungene Sammlung sämtlicher Cover des Rollenspiels der letzten zehn Jahre – für Cthulhu-Komplettisten sowieso ein Muss.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Cthulhu-Design.jpg', '2012-03-28 13:41:59'),

(13, 2, 'buch', 'MADs Große Meister - Don Martin - Band 1',
 'Obwohl er schon seit Ende der 80er Jahre des letzten Jahrhunderts keine neuen Arbeiten mehr für MAD beisteuerte, zählen die Zeichnungen des im Januar 2000 verstorbenen Cartoonisten Don Martin nach wie vor zu den bekanntesten und beliebtesten Beiträgen dieses Heftes. Auch heute noch kommt keine Ausgabe des Magazins ohne einen Reprint seiner Gags aus und so bleibt er auch jüngeren Lesergenerationen weiter ein Begriff. Grund genug für Panini Comics dem Zeichner gleich eine ganze Trilogie zu widmen, wobei der hier vorliegende erste Hardcover-Band das Material aus den Jahren 1956 bis 1967 zusammenfasst. Das Großartige an den Cartoons von Don Martin ist, dass sie auch nach so langer Zeit immer noch funktionieren. Viele seiner Strips waren schon alt, als ich sie Mitte der 80er Jahre das erste Mal im MAD-Magazin gesehen habe – und bringen mich auch heute noch zum Schmunzeln.',
 'MADs Große Meister – Don Martin bietet einen gelungenen, wenn auch etwas kostspieligen, Überblick über das Frühwerk eines der besten und einflussreichsten Cartoonisten.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/MAD-Don-Martin-1.jpg', '2013-04-03 14:57:49'),

(14, 2, 'buch', 'Crossed 4 - Badlands',
 'Als Panini Comics 2012 das neueste Werk des Comicautors Garth Ennis veröffentlichte, war die Leserschaft gespannt, was sich der, für seine wenig zimperlichen Stories bekannte, Ire wohl diesmal ausgedacht hatte. Herausgekommen ist dabei Crossed, eine Endzeitvision, bei der ein Großteil der Menschheit durch eine nicht näher definierte Seuche in sadistische Kannibalen verwandelt wurde. Der vorliegende Crossed – Badlands ist mittlerweile der vierte Band der Serie und enthält auf 212 Seiten zwei Geschichten unterschiedlicher Autoren- und Zeichnerteams. Für die erste Story „Badlands" arbeitet Garth Ennis wieder mit dem Zeichner Jacen Burrows zusammen. Spielten alle bisherigen Bände in den USA, so verlegt der Autor die Handlung diesmal in die schottischen Highlands. Letztendlich stehe ich Crossed – Badlands etwas zwiespältig gegenüber: Die Figuren sind gut geschrieben, die Atmosphäre ist dicht und die Stories sind spannend.',
 'Die beiden Autoren legen hier einen stellenweise nur schwer erträglichen Band vor, der in Sachen Härte jeden mir bekannten Comic weit in den Schatten stellt.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Crossed4.jpg', '2013-12-04 20:29:51'),

(15, 2, 'buch', 'Lexikon des bürokratischen Wahnsinns',
 'Jeder, der schon einmal mit einer Verwaltung oder einer Behörde zu tun hatte, hat sicherlich schon bei manchen Vorschriften die Hände über dem Kopf zusammengeschlagen und sich gefragt, wer sich solche Sachen denn eigentlich ausdenkt. Stefan Horn, seines Zeichens Wirtschaftsjournalist und Autor, hat sich die Mühe gemacht und einige der absonderlichsten Blüten dieses Verwaltungsdschungels in seinem Buch Lexikon des bürokratischen Wahnsinns zusammengetragen. Dabei beschränkt er sich nicht nur auf eine reine Auflistung, sondern ergänzt die Kapitel auch um einige Kommentare und versucht Licht in die Hintergründe der jeweiligen Bestimmung zu bringen. Veröffentlicht wird der 192seitige Hardcover-Band vom Ariston Verlag. Fein säuberlich und alphabetisch geordnet listet der Autor insgesamt 52 Punkte auf, bei denen der Leser immer schon vermutet hat, dass etwas falsch läuft.',
 'Ein gelungenes Buch, das einen detaillierten Blick auf die Abstrusitäten eines Verwaltungsapparates wirft, der sich weitgehend vom wirklichen Leben abgekoppelt hat.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Lexikon-Wahnsinn.jpg', '2013-08-28 19:23:12'),

-- Spiel (IDs 16–27)
(16, 2, 'spiel', 'Smash Up',
 'In letzter Zeit konzentrieren sich Pegasus Spiele eher auf anspruchsvolle und aufwendige Brettspiele und können in diesem Bereich auch auf einige sehr eindrucksvolle Veröffentlichungen zurückblicken. Daneben findet der Friedberger Verlag aber doch immer noch Zeit kleine, schnelle Spiele heraus zu bringen, die sich eher für zwischendurch eignen oder Gelegenheitsspieler ansprechen. An genau diese Zielgruppe richtet sich das Deckmix-Kartenspiel Smash Up von Paul Peterson. Dabei versuchen bis zu vier Spieler mit ihrem Kartendeck möglichst viele Basen zu zerstören, Punkte zu sammeln und so den Sieg zu erringen. Das Spielmaterial in der kleinen Schachtel ist recht übersichtlich: 160 Spielkarten, 16 Basiskarten und die umfangreiche Anleitung. Acht Fraktionen mit je zwanzig Karten stehen den Spielern zur Auswahl – Ninjas, Piraten, Außerirdische, vercyberte Dinosaurier, Gauner, Zauberer, Roboter und Zombies.',
 'Pegasus Spiele legen hier wieder ein schnelles, einfaches und lustiges Kartenspiel vor, das aber auch für Taktiker seine Reize bietet.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Smash-Up.jpg', '2013-06-06 18:44:03'),

(17, 2, 'spiel', 'Smash Up - Der endgültige Cthulhu',
 'Es ist noch gar nicht so lange her, dass Pegasus Spiele mit Wahnsinnslevel 9000 die erste Erweiterung für das wilde Deckmix-Kartenspiel Smash Up veröffentlicht hat. Nun, kein halbes Jahr später, erscheint schon der nächste Kartensatz für das Spiel. Mit Der endgültige Cthulhu huldigt Autor Paul Peterson dem bekanntesten der Großen Alten und liefert den Spielern nebenbei vier neue Fraktionen. Diese lassen sich mit den bestehenden Kartendecks aus dem Grundspiel und der ersten Erweiterung kombinieren oder können auch alleine, als Zwei-Personen-Spiel, genutzt werden. Neben den 20 Karten für das Deck und zwei Basen für jede Fraktion liegen der kleinen Box auch noch 30 Wahnsinnskarten bei. Manche Karten erlauben es den Spielern nun, Wahnsinnskarten von einem separaten Stapel zu ziehen – ein neuer Spielmechanismus.',
 'Pegasus Spiele machen auch mit der zweiten Erweiterung für Smash Up alles richtig und sorgen für chaotische und spaßige Spielrunden.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Smash-Up-Cthulhu.jpg', '2013-11-14 19:42:53'),

(18, 2, 'spiel', 'Ghooost!',
 'Richard Garfield zählt zweifellos zu den bekanntesten Spieleautoren und kann mit einer ganzen Reihe von grandiosen Spielideen aufwarten. Waren viele seiner Schöpfungen komplexe oder doch zumindest umfangreiche Spiele, so ist Ghooost!, das vom Heidelberger Spieleverlag veröffentlicht wird, doch sehr klein und überschaubar geraten. Jeder der bis zu sechs Spieler ist darin Besitzer eines Spukhauses und versucht die Geister aus seinem Haus zu vertreiben, bevor dies den Mitspielern gelingt. Die kleine Schachtel, die auch als Spielbrett genutzt wird, enthält 62 Karten, auf denen verschiedene Geister mit Zahlenwerten von 1 bis 14 abgebildet sind. Das Spielprinzip ist solide und funktioniert mit jeder Spielerzahl gleichermaßen gut. Auch die Nutzung der Schachtel als Spielbrett ist durchdacht und reduziert den benötigten Platz auf ein Minimum.',
 'Für Freunde schneller, unkomplizierter Kartenspiele ist Ghooost! genau richtig und auch der Nachwuchs dürfte an dem liebevoll illustrierten Spiel seine Freude haben.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Ghooost.jpg', '2015-01-07 20:10:02'),

(19, 2, 'spiel', 'Zombicide - Toxic City Mall',
 'Im letzten Jahr erregte die Crowdfunding-Kampagne des bis dato unbekannten französischen Spieleherstellers Guillotine Games in der Brettspielszene, und auch darüber hinaus, einiges Aufsehen. Das Ergebnis dieser Kampagne, die kooperative Untoten-Jagd Zombicide, konnte sowohl optisch als auch spielerisch überzeugen und war ein entsprechend großer Erfolg. Daher war es nur eine Frage der Zeit, bis der Verlag eine Erweiterung des Grundspiels nachlegen würde. Mittlerweile ist Zombicide - Toxic City Mall, ebenfalls über Crowdfunding finanziert, erschienen und erweitert das Spiel nicht nur um neue Bodenpläne und Charaktere, sondern führt gleich einige frische Spielelemente ein. Zu den Neuerungen gehören die Toxic Zombies, die beim Tod ihrer Vernichtung alle Spieler im selben Feld verletzen, der Ultrared Mode und die Zombivor-Regeln für gefallene Charaktere.',
 'Eine gelungene Erweiterung, die das Spiel tatsächlich bereichert und für viele weitere spannende Zombiejagden sorgen dürfte.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Zombicide-TCM.jpg', '2013-12-15 20:17:28'),

(20, 2, 'spiel', 'Feiertage der Furcht',
 'Das Konzept von Pegasus Press, Abenteuersammlungen für das Horror-Rollenspiel H.P. Lovecrafts Cthulhu zu einem günstigen Preis zu veröffentlichen, wurde von der Spielerschaft im letzten Jahr offensichtlich gut angenommen. Grund genug für den Friedberger Verlag mit Feiertage der Furcht nun die dritte dieser Anthologien auf den Markt zu bringen. Enthalten sind diesmal drei Abenteuer, wobei eines davon bereits im Magazin Cthuloide Welten veröffentlicht wurde; bei den beiden anderen handelt es sich dagegen um neues Material. Die drei Szenarien „Verlobung auf Girnwood Manor", „Sobeks Silvester" und „Unhappy Thanksgiving" decken ein breites Spektrum ab: Detektivische Spurensuche, ägyptische Begräbnisrituale und das mysteriöse Verschwinden eines Kindes in einem kleinen amerikanischen Kaff.',
 'Der Leser bekommt mit Feiertage der Furcht eine gelungene kleine Abenteuersammlung, die sowohl für Rollenspiel-Neulinge als auch erfahrene Veteranen passendes Material bereithält.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Cthulhu-Feiertage.jpg', '2016-04-06 21:50:08'),

(21, 2, 'spiel', 'Munchkin Panic',
 'Nicht ganz neu ist die grundlegende Idee, die hinter Munchkin Panic von Stephen Glenn steckt: Spieler müssen eine Burg gegen angreifende Monsterhorden verteidigen. Das Grundgerüst für Munchkin Panic bildet dabei das schon 2009 erschienene kooperative Brettspiel Castle Panic, das hier durch Elemente des ganz und gar nicht kooperativen Kult-Kartenspiels Munchkin erweitert wird. Nach dem Öffnen der Box fällt vor allem das recht große Spielfeld auf, das die Burg der Spieler mitsamt ihrer Umgebung zeigt. Auf der einen Seite sind die Spieler darauf angewiesen sich gegenseitig im Kampf gegen die Monster zu unterstützen, auf der anderen Seite muss darauf geachtet werden, dass ein Spieler nicht zu viele Trophäen sammelt und so das Spiel gewinnt. Das Spiel funktioniert mit jeder Spieleranzahl recht gut, auch die Solitärvariante macht Spaß.',
 'Pegasus Spiele gelingt hier eine gelungene Verknüpfung zweier eigentlich grundverschiedener Spielkonzepte, die Spaß macht und optisch überzeugen kann.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Munchkin-Panic.jpg', '2015-01-21 12:57:58'),

(22, 2, 'spiel', 'Deutschland - Blutige Kriege & Goldene Jahre',
 'Bei dem neuesten Quellenband für das Rollenspiel H.P. Lovecrafts Cthulhu handelt es sich eigentlich nicht um eine wirkliche Neuveröffentlichung. Tatsächlich legen Pegasus Press mit dem Hardcover-Band Deutschland – Blutige Kriege & Goldene Jahre lediglich die überarbeitete Neuauflage der gleichnamigen Box aus dem Jahr 2003 vor. Ergänzt mit neuem Material und mit drei Abenteuern finden sich hier für Spieler und Spielleiter alle Informationen die benötigt werden, um die Zeit der Weimarer Republik im Rollenspiel wieder lebendig werden zu lassen. Auf gut zwei Drittel der stolzen 384 Seiten widmet sich der Band einem Land, das sich nach dem Verlust des Großen Krieges wieder neu finden muss. Die verschiedenen Kapitel decken weitgehend alle wichtigen Themen ab: Politik, Alltag, Wirtschaft, Kultur, Kriminalität, Okkultismus.',
 'Für Spielleiter, die ihre Cthulhu-Kampagne in Deutschland ansiedeln wollen, ist dieser Band ein Pflichtkauf.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Cthulhu-Deutschland.jpg', '2012-03-04 14:30:43'),

(23, 2, 'spiel', 'In Her Majesty''s Name',
 'Der renommierte britische Verlag Osprey Publishing, vor allem bekannt durch seine militärhistorischen Bücher, wagt sich gelegentlich auch in andere Bereiche vor und publiziert historische Romane oder bringt unter dem Label Osprey Wargames auch selbst Regelbücher für Tabletop-Spiele heraus. Das vorliegende Skirmish-Spiel In Her Majesty''s Name folgt dabei dem derzeitigen Steampunk-Trend und führt den Leser in die Zeit um das Jahr 1895, in der das britische Empire unter Königin Viktoria auf dem Höhepunkt seiner Macht war. Kleine Gruppen mutiger Männer kämpfen hier um technische Errungenschaften, mystische Artefakte und natürlich Gold und Ruhm. Das Spiel wird in Runden abgehandelt, in denen die Spieler ihre Figuren abwechselnd ziehen. Es benötigt nur wenige Figuren (zehn bis fünfzehn) und eignet sich damit sehr gut als Einstieg in Steampunk-Tabletops.',
 'Ein ordentliches Regelsystem, die schön umgesetzte Steampunk-Thematik und geringe Einstiegskosten machen das Spiel zu einer lohnenden Anschaffung für Tabletop-Interessierte.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Osprey-In-her-Majestys-name.jpg', '2013-05-20 15:13:52'),

(24, 2, 'spiel', 'Dunwich - Grauen in den Hügeln',
 'Der sechste und gleichzeitig letzte Band der Lovecraft Country Collection führt den Leser diesmal von den Städten und der Küste weg ins neuenglische Hinterland. Dunwich – Das Grauen in den Hügeln bündelt alle Informationen rund um das abgelegene Dorf und seine Bewohner und gibt dem Spielleiter damit die Gelegenheit, seine Spieler in diesen klassischen Hintergrund eintauchen zu lassen. Bei dem Band handelt es sich um die deutsche Übersetzung des amerikanischen Buches Return to Dunwich, das jedoch, wie der Leser es von Pegasus Press gewohnt ist, überarbeitet, neu gestaltet und durch Abenteuer aus verschiedenen anderen Publikationen ergänzt wurde. Etwas mehr als die Hälfte der 306 Seiten sind der ausführlichen Beschreibung des Ortes Dunwich, seiner Bewohner und des Umlandes vorbehalten. Der zweite Teil des Bandes ist sieben Abenteuern vorbehalten.',
 'Dunwich – Das Grauen in den Hügeln ist wieder ein gelungener Band aus der Cthulhu-Serie, der die Ermittler in die neuenglische Wildnis führt.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Cthulhu-Dunwich.jpg', '2012-12-02 14:49:58'),

(25, 2, 'spiel', 'Da Luigi',
 'Für Spieler, die sich schon immer einmal als Betreiber einer Pizzeria versuchen wollten, hat der Kosmos-Verlag nun mit Da Luigi das passende Spiel veröffentlicht. Hier müssen sich bis zu vier angehende Restaurantbesitzer mit ungeduldiger Kundschaft, dem wechselnden Warenangebot des Marktes und der lästigen Konkurrenz herumschlagen. Bei einem ersten Blick in die Box fallen vor allem die Ristoranteleisten auf, die vor jedem Spieler abgelegt werden. Diese sind in sechs Abschnitte, von 60 bis 10 Minuten aufgeteilt, was die Wartezeit der Gäste symbolisiert. Das Spiel ist ein nettes, nicht übermäßig komplexes Familienspiel, das sich flüssig spielt und dazu auch noch Spaß macht. Die Spielmechanik mit der Wartezeit der Gäste ist gut umgesetzt. Zu zweit gespielt sind durchaus taktische Überlegungen möglich, allerdings macht das Spiel zu viert deutlich mehr Spaß.',
 'Kosmos legt hier ein schönes, lustiges Spiel vor, das sich gleichermaßen als Familienspiel und als kurzweilige Abwechslung für Zwischendurch eignet.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Da-Luigi.jpg', '2015-04-19 12:42:38'),

(26, 2, 'spiel', 'Von Drachen und Schafen',
 'Bei meinem diesjährigen Besuch auf der Spielwarenmesse in Nürnberg fiel mir bei meinem Abstecher zum Stand von Kosmos besonders das Kartenspiel Von Drachen und Schafen wegen seiner ansprechenden Fantasy-Illustrationen ins Auge. Daher war es nur eine Frage der Zeit, bis das gute Stück nach seiner Veröffentlichung in meine Sammlung wanderte. Bis zu vier Spieler übernehmen in diesem Spiel von Nathanael Mortensen die Rolle von Drachen und versuchen möglichst wertvolle Schätze zusammen zu raffen. Das Spielmaterial in der kleinen Schachtel besteht aus 101 ungewöhnlich großen Karten, die auf der Rückseite jeweils ein Schaf in einer von fünf Farben zeigen. Die Karten lassen sich grob in vier unterschiedliche Kategorien aufteilen: Aktionskarten, Höhlenkarten, Wilde Schafe (Joker) und Schätze. Das Spiel ist nicht übermäßig komplex und macht mit vier Spielern am meisten Spaß.',
 'Ein unkompliziertes Kartenspiel für die ganze Familie, das außerdem mit tollen Zeichnungen aufwarten kann.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Drachen-Schafen.jpg', '2015-03-07 20:03:03'),

(27, 2, 'spiel', 'Sprengstoff',
 'Im Portfolio des moses. Verlages finden sich zahlreiche Frage- und Quizspiele, allen voran natürlich die black stories-Reihe. In eine ganz andere Richtung geht das hier vorliegende Sprengstoff, bei dem die Spieler in einer Reihe von Spielvarianten teils recht persönliche Fragen beantworten müssen und damit den Mitspielern einen kleinen Einblick in ihr Innerstes gewähren. Das Spielmaterial besteht aus insgesamt 57 großformatigen Karten, von denen auf fünf die verschiedenen Spielvarianten und das Impressum untergebracht sind. Auf den restlichen 52 Karten befinden sich Fragen aus jeweils sechs Kategorien: Alltag, Karriere, Sex, Freunde & Familie, Psychoanalyse sowie Philosophie und Fortschritt. Die Fragen decken ein breites Spektrum ab und erfordern von den Spielern sogar manchmal ernsthaftes Nachdenken.',
 'Der moses. Verlag legt hier ein recht unterhaltsames und stellenweise durchaus anspruchsvolles Fragespiel vor, das – die richtigen Mitspieler vorausgesetzt – gut zu unterhalten weiß.',
 NULL, 'https://www.roterdorn.de/wp-content/uploads/2016/04/Sprengstoff.jpg', '2015-01-05 12:26:00');

-- ============================================================
-- Musik-Details (review_id 1–6)
-- ============================================================

INSERT INTO music_details (review_id, artist, label, release_date, runtime_minutes) VALUES
(1, 'Frogbelly And Symphony', 'Labelship',           '2013-08-18', NULL),
(2, 'Folk''s Sake',           'Prosodia/MSP-Music',  '2014-10-24',   60),
(3, 'The Birthday Massacre',  'Out Of Line',         '2012-03-10', NULL),
(4, 'The Eden House',         NULL,                  '2013-05-15', NULL),
(5, 'Liz Hanley',             'Labelship',           '2013-08-11', NULL),
(6, 'Sally Dige',             'Night School Records','2016-04-10', NULL);

-- ============================================================
-- Film-Details (review_id 7–9)
-- ============================================================

INSERT INTO film_details (review_id, director, studio, release_year, runtime_minutes, fsk, language) VALUES
(7, 'Ridley Scott',  '20th Century FOX',   2015, 144, 12, 'Englisch'),
(8, 'J.J. Abrams',   'Lucasfilm/Disney',   2015, 136, 12, 'Englisch'),
(9, 'Sergei Bodrov', 'Universal Pictures', 2015, 102, 12, 'Englisch');

-- ============================================================
-- Buch-Details (review_id 10–15)
-- ============================================================

INSERT INTO book_details (review_id, isbn, page_count, publisher, release_date, language, format, price) VALUES
(10, NULL, 180, 'Panini Comics',   NULL, 'Deutsch', 'Softcover',   NULL),
(11, NULL, NULL,'Mantikore Verlag',NULL, 'Deutsch', 'Taschenbuch', NULL),
(12, NULL, 118, 'Selbstverlag',    NULL, 'Deutsch', 'Softcover',   NULL),
(13, NULL, 340, 'Panini Comics',   NULL, 'Deutsch', 'Hardcover',   NULL),
(14, NULL, 212, 'Panini Comics',   NULL, 'Deutsch', 'Softcover',   NULL),
(15, NULL, 192, 'Ariston Verlag',  NULL, 'Deutsch', 'Hardcover',   NULL);

-- ============================================================
-- Spiel-Details (review_id 16–27)
-- ============================================================

INSERT INTO game_details (review_id, developer, publisher, release_date, platform, genre, min_players, max_players) VALUES
(16, NULL,             'Pegasus Spiele',           NULL, NULL, 'Kartenspiel',             2, 4),
(17, NULL,             'Pegasus Spiele',           NULL, NULL, 'Kartenspiel',             2, 4),
(18, NULL,             'Heidelberger Spieleverlag',NULL, NULL, 'Kartenspiel',             2, 6),
(19, 'Guillotine Games','Guillotine Games',         NULL, NULL, 'Kooperatives Brettspiel', 1, 6),
(20, NULL,             'Pegasus Press',            NULL, NULL, 'Rollenspiel',             2, 6),
(21, NULL,             'Pegasus Spiele',           NULL, NULL, 'Brettspiel',              1, 6),
(22, NULL,             'Pegasus Press',            NULL, NULL, 'Rollenspiel',             2, 6),
(23, NULL,             'Osprey Publishing',        NULL, NULL, 'Tabletop',                2, 6),
(24, NULL,             'Pegasus Press',            NULL, NULL, 'Rollenspiel',             2, 6),
(25, NULL,             'Kosmos',                   NULL, NULL, 'Familienspiel',           2, 4),
(26, NULL,             'Kosmos',                   NULL, NULL, 'Kartenspiel',             2, 4),
(27, NULL,             'moses. Verlag',            NULL, NULL, 'Fragespiel',              2, 6);

-- Damit neue Einträge über die App keine ID-Konflikte verursachen
ALTER TABLE authors AUTO_INCREMENT = 10;
ALTER TABLE reviews AUTO_INCREMENT = 30;
