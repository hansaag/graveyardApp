CREATE DATABASE gardener;

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
    gy_name VARCHAR(20),
    field VARCHAR(2),
    gåklippet TIMESTAMP,
    sitteklippet TIMESTAMP,
    kantklippet TIMESTAMP,
    vannet TIMESTAMP,
    blomsterstell TIMESTAMP,
    luket_hekk TIMESTAMP,
    klippet_hekk TIMESTAMP,
    fjernet_kvist TIMESTAMP,
    luket_graver TIMESTAMP,
    skjegget_trær TIMESTAMP,
    begravelse BOOLEAN,
    PRIMARY KEY(gy_id, field)
);