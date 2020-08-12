CREATE DATABASE gardener;

-- could/should change to number of fields
CREATE TABLE graveyards(
    gy_id INT PRIMARY KEY,
    gy_name VARCHAR(20),
    img_src VARCHAR(50),
    vannet DATE,
    slaaddet DATE,
    blaast_veier DATE,
    hekkeklipp DATE
);

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

CREATE TABLE projects(
    gy_id INT NOT NULL references graveyards(gy_id),
    project_id SERIAL,
    project_title VARCHAR(50),
    project_descr VARCHAR(350),
    project_prio INT,
    deadline DATE,
    added DATE default CURRENT_DATE,
    PRIMARY KEY(gy_id, project_id)

);

CREATE TABLE comments(
    gy_id INT NOT NULL,
    project_id INT NOT NULL,
    comment_id SERIAL,
    comment VARCHAR(150),
    added DATE default CURRENT_DATE,
    PRIMARY KEY(comment_id)
);

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




UPDATE fields
SET $value = $value 

ALTER TABLE graveyards
ADD COLUMN vannet DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN slaaddet DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN blaast_veier DATE DEFAULT CURRENT_DATE;
 
ALTER TABLE graveyards
ADD COLUMN fjernet_kvist DATE;

ALTER TABLE graveyards
ADD COLUMN hekkeklipp DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN blomsterstell DATE DEFAULT CURRENT_DATE;

ALTER TABLE fields 
DROP COLUMN vannet;

ALTER TABLE fields 
DROP COLUMN luket_graver;

ALTER TABLE projects
DROP COLUMN comment_5;



UPDATE fields 
SET gåklippet = '2020-07-14',
sitteklippet = '2020-07-14',
kantklippet = '2020-07-16',
vannet = '2020-07-16',
blomsterstell = '2020-07-17',
fjernet_kvist = '2020-07-17'
WHERE gy_id = 2 AND field = 'C';


UPDATE fields 
SET gåklippet = '2020-07-14',
sitteklippet = '2020-07-17',
kantklippet = '2020-07-17',
vannet = '2020-07-13',
blomsterstell = '2020-07-14',
fjernet_kvist = '2020-07-14'
WHERE gy_id = 2 AND field = 'D';