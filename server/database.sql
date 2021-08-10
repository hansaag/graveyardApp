/* template for recreating the PSQL database on a new server */

/* Main DB */
CREATE DATABASE gardener;

/* Locations of graveyards (will need to add region foreign key
if expanding to more reqions */
CREATE TABLE graveyards(
    gy_id INT PRIMARY KEY,
    gy_name VARCHAR(20),
    img_src VARCHAR(50),
    vannet DATE,
    slaaddet DATE,
    blaast_veier DATE,
    hekkeklipp DATE
);
/* The values needed for each field in a graveyard */
CREATE TABLE fields(
    gy_id INT references graveyards(gy_id),
    field VARCHAR(2),
    gåklippet DATE,
    sitteklippet DATE,
    kantklippet DATE,
    blomsterstell DATE,
    klippet_hekk DATE,
    skjegget_trær DATE,
    begravelse BOOLEAN,
    PRIMARY KEY(gy_id, field)
);
/* New projects for a selected graveyard. These are added 
dynamically by users. */
CREATE TABLE projects(
    gy_id INT NOT NULL references graveyards(gy_id),
    project_id SERIAL,
    project_title VARCHAR(50),
    project_descr VARCHAR(350),
    project_prio INT,
    deadline DATE,
    percent_finished INT,
    added DATE default CURRENT_DATE,
    PRIMARY KEY(gy_id, project_id)

);
/* Comments added to a specific project active at a specific graveyard */
CREATE TABLE comments(
    gy_id INT NOT NULL,
    project_id INT NOT NULL,
    comment_id SERIAL,
    comment VARCHAR(150),
    added DATE default CURRENT_DATE,
    PRIMARY KEY(comment_id)
);

/* Templates for adding graveyards and fields. This needs to be done in order
to interact with tasks at the given graveyard */
INSERT INTO graveyards VALUES (1, 'Strømsø', null, null, null, null, null);

INSERT INTO fields (gy_id, field)
VALUES
(1, 'A'),
(1, 'B'),
(1, 'C'),
(1, 'D'),
(1, 'E'),
(1, 'F'),
(1, 'G'),
(1, 'H'),
(1, 'I'),
(1, 'J'),
(1, 'K'),
(1, 'L'),
(1, 'M');




INSERT INTO graveyards VALUES (2, 'Tangen', null, null, null, null, null);

INSERT INTO fields (gy_id, field)
VALUES
(2, 'A'),
(2, 'B'),
(2, 'C'),
(2, 'D'),
(2, 'E'),
(2, 'F'),
(2, 'G'),
(2, 'H'),
(2, 'I'),
(2, 'J'),
(2, 'K'),
(2, 'L');



