CREATE DATABASE gardener;

-- could/should change to number of fields
CREATE TABLE graveyards(
    gy_id INT PRIMARY KEY,
    gy_name VARCHAR(20),
    img_src VARCHAR(50),
);

CREATE TABLE fields(
    gy_id INT references graveyards(gy_id),
    field VARCHAR(2),
    gåklippet DATE,
    sitteklippet DATE,
    kantklippet DATE,
    vannet DATE,
    blomsterstell DATE,
    luket_hekk DATE,
    klippet_hekk DATE,
    fjernet_kvist DATE,
    luket_graver DATE,
    skjegget_trær DATE,
    begravelse BOOLEAN,
    PRIMARY KEY(gy_id, field)
);

ALTER TABLE graveyards
ADD COLUMN vannet DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN slaaddet DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN blaast_veier DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN blaast_veier DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN hekkeklipp DATE DEFAULT CURRENT_DATE;

ALTER TABLE graveyards
ADD COLUMN blomsterstell DATE DEFAULT CURRENT_DATE;



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