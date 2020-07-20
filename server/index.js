const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

app.post("/graveyards", async (req, res) => {
  try {
    const {
      gy_id,
      gy_name,
      img_src,
      vannet,
      slaaddet,
      blaast_veier,
      hekkeklipp,
    } = req.body;
    const newGraveyard = await pool.query(
      "INSERT INTO graveyards \
      (gy_id, gy_name, img_src, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, \
        field11, field12, field13, field14, field15, field16, field17, field18, field19, field20) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) \
        Returning *",
      [gy_id, gy_name, img_src, vannet, slaaddet, blaast_veier, hekkeklipp]
    );

    res.json(newGraveyard.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/fields", async (req, res) => {
  try {
    const {
      gy_id,
      field,
      gåklippet,
      sitteklippet,
      kantklippet,
      vannet,
      blomsterstell,
      luket_hekk,
      klippet_hekk,
      fjernet_kvist,
      luket_graver,
      skjegget_trær,
      begravelse,
    } = req.body;
    const newField = await pool.query(
      "INSERT INTO fields \
      (gy_id, field, gåklippet, sitteklippet, kantklippet, vannet, blomsterstell, luket_hekk, klippet_hekk, \
        fjernet_kvist, luket_graver, skjegget_trær, begravelse) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) Returning *",
      [
        gy_id,
        field,
        gåklippet,
        sitteklippet,
        kantklippet,
        vannet,
        blomsterstell,
        luket_hekk,
        klippet_hekk,
        fjernet_kvist,
        luket_graver,
        skjegget_trær,
        begravelse,
      ]
    );

    res.json(newField.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/graveyards", async (req, res) => {
  try {
    const allGraveyards = await pool.query(
      "SELECT gy_name FROM graveyards ORDER BY gy_id"
    );
    res.json(allGraveyards.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/graveyards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gyFields = await pool.query(
      "SELECT vannet, slaaddet, blaast_veier, hekkeklipp FROM graveyards WHERE gy_id = $1",
      [id]
    );
    res.json(gyFields.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/fields/:id/:felt", async (req, res) => {
  try {
    const { id, felt } = req.params;
    const field = await pool.query(
      "SELECT * FROM fields WHERE gy_id = $1 AND field = $2",
      [id, felt]
    );
    res.json(field.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/fields", async (req, res) => {
  try {
    const allFields = await pool.query("SELECT * FROM fields");
    res.json(allFields.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// app.put("/graveyards/:id", async (req, res) => {
//   try {
//     const { id, field } = req.params;
//     const { activity, operation } = req.body;
//     var date = new Date();
//     var timestamp = date.getTime();
//     const updateField = await pool.query(
//       "UPDATE fields SET $1 = $2 WHERE gy_id = $3 and field = $4",
//       [activity, operation, id, field]
//     );
//     res.json("Activity was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
