CREATE DATABASE gardener;

-- could/should change to number of fields
CREATE TABLE graveyards(
    gy_id INT PRIMARY KEY,
    gy_name VARCHAR(20),
    img_src VARCHAR(50),
    field1 VARCHAR(2),
    field2 VARCHAR(2),
    field3 VARCHAR(2),
    field4 VARCHAR(2),
    field5 VARCHAR(2),
    field6 VARCHAR(2),
    field7 VARCHAR(2),
    field8 VARCHAR(2),
    field9 VARCHAR(2),
    field10 VARCHAR(2),
    field11 VARCHAR(2),
    field12 VARCHAR(2),
    field13 VARCHAR(2),
    field14 VARCHAR(2),
    field15 VARCHAR(2),
    field16 VARCHAR(2),
    field17 VARCHAR(2),
    field18 VARCHAR(2),
    field19 VARCHAR(2),
    field20 VARCHAR(2)
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