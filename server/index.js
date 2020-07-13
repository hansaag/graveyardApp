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
      field1,
      field2,
      field3,
      field4,
      field5,
      field6,
      field7,
      field8,
      field9,
      field10,
      field11,
      field12,
      field13,
      field14,
      field15,
      field16,
      field17,
      field18,
      field19,
      field20,
    } = req.body;
    const newGraveyard = await pool.query(
      "INSERT INTO graveyards \
      (gy_id, gy_name, img_src, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, \
        field11, field12, field13, field14, field15, field16, field17, field18, field19, field20) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23) \
        Returning *",
      [
        gy_id,
        gy_name,
        img_src,
        field1,
        field2,
        field3,
        field4,
        field5,
        field6,
        field7,
        field8,
        field9,
        field10,
        field11,
        field12,
        field13,
        field14,
        field15,
        field16,
        field17,
        field18,
        field19,
        field20,
      ]
    );

    res.json(newGraveyard.rows[0]);
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
    const { gy_id } = req.params;
    const graveyard = await pool.query(
      "SELECT * FROM graveyards WHERE gy_id = $1",
      [gy_id]
    );
    res.json(graveyard.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/graveyards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { operation } = req.body;
    var date = new Date();
    var timestamp = date.getTime();
    const updateField = await pool.query(
      "UPDATE fields SET $1 = $2 WHERE gy_id = $3",
      [operation, timestamp, id]
    );
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/graveyards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
