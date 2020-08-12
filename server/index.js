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
      (gy_id, gy_name, img_src, vannet, slaaddet, blaast_veier, hekkeklipp) \
        VALUES($1, $2, $3, $4, $5, $6) \
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
      blomsterstell,
      klippet_hekk,
      skjegget_trær,
      begravelse,
    } = req.body;
    const newField = await pool.query(
      "INSERT INTO fields \
      (gy_id, field, gåklippet, sitteklippet, kantklippet, blomsterstell, klippet_hekk, \
        skjegget_trær, begravelse) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) Returning *",
      [
        gy_id,
        field,
        gåklippet,
        sitteklippet,
        kantklippet,
        blomsterstell,
        klippet_hekk,
        skjegget_trær,
        begravelse,
      ]
    );

    res.json(newField.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/projects", async (req, res) => {
  try {
    const {
      gy_id,
      project_title,
      project_descr,
      project_prio,
      deadline,
    } = req.body;
    const newProject = await pool.query(
      "INSERT INTO projects (gy_id, project_title, project_descr, project_prio, deadline) \
      VALUES($1, $2, $3, $4, $5) Returning *",
      [gy_id, project_title, project_descr, project_prio, deadline]
    );
    res.json(newProject.rows[0]);
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

app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allProjects = await pool.query(
      "SELECT * from projects where gy_id = $1 ORDER BY project_prio",
      [id]
    );
    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/graveyards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const gyFields = await pool.query(
      "SELECT vannet, slaaddet, blaast_veier, fjernet_kvist FROM graveyards WHERE gy_id = $1",
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
    console.log(allFields.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/fields/:id/:field", async (req, res) => {
  try {
    const { id, field } = req.params;
    const { dbActivity, completedDate } = req.body;
    const updateField = await pool.query(
      "UPDATE fields SET " +
        dbActivity +
        " = $1 WHERE gy_id = $2 and field = $3",
      [completedDate, id, field]
    );
    res.json("Activity was updated!");
    console.log(id, field);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects/:id:/:serial", async (req, res) => {
  try {
    const { id, serial } = req.params;
    const project = await pool.query(
      "SELECT * FROM projects WHERE gy_id = $1 AND project_id = $2",
      [id, serial]
    );
    res.json(project.rows[0]);
    console.log("GOTTEN");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/comments", async (req, res) => {
  try {
    const { id, ser, newComment } = req.body;
    console.log(newComment);
    const addComment = await pool.query(
      "INSERT INTO comments (gy_id, project_id, comment) VALUES ($1, $2, $3) RETURNING *",
      [id, ser, newComment]
    );
    res.json("Activity was updated!");
  } catch (err) {
    console.log(req.body);

    console.error(err.message);
  }
});

app.get("/comments/:id/:ser", async (req, res) => {
  try {
    const { id, ser } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments where gy_id = $1 and project_id = $2",
      [id, ser]
    );
    res.json(comments.rows);
    console.log(comments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/graveyards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { dbActivity, completedDate } = req.body;
    const updateGy = await pool.query(
      "UPDATE graveyards SET " + dbActivity + " = $1 WHERE gy_id = $2",
      [completedDate, id]
    );
    res.json("Activity was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
