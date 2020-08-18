const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.post("/graveyards", cors(corsOptions), async (req, res) => {
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

app.post("/fields", cors(corsOptions), async (req, res) => {
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

app.post("/projects", cors(corsOptions), async (req, res) => {
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

app.get("/graveyards", cors(corsOptions), async (req, res) => {
  try {
    const allGraveyards = await pool.query(
      "SELECT gy_name FROM graveyards ORDER BY gy_id"
    );
    res.json(allGraveyards.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/projects/:id", cors(corsOptions), async (req, res) => {
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

app.get("/graveyards/:id", cors(corsOptions), async (req, res) => {
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

app.get("/fields/:id/:felt", cors(corsOptions), async (req, res) => {
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

app.get("/fields", cors(corsOptions), async (req, res) => {
  try {
    const allFields = await pool.query("SELECT * FROM fields");
    res.json(allFields.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/fields/:id/", cors(corsOptions), async (req, res) => {
  try {
    const { id } = req.params;
    const fieldValues = await pool.query(
      "SELECT * FROM fields where gy_id = $1 ORDER BY field",
      [id]
    );
    res.json(fieldValues.rows);
    console.log(fieldValues.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/fields/:id/:field", cors(corsOptions), async (req, res) => {
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

app.get("/projects/:id:/:serial", cors(corsOptions), async (req, res) => {
  try {
    const { id, serial } = req.params;
    const project = await pool.query(
      "SELECT * FROM projects WHERE gy_id = $1 AND project_id = $2",
      [id, serial]
    );
    res.json(project.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/projects/:id/:serial", cors(corsOptions), async (req, res) => {
  try {
    const { id, serial } = req.params;
    const { temporaryProgress } = req.body;
    const updated = await pool.query(
      "UPDATE projects SET percent_finished = $1 where gy_id = $2 and project_id = $3",
      [temporaryProgress, id, serial]
    );
    console.log("updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/comments", cors(corsOptions), async (req, res) => {
  try {
    const { id, ser, newComment } = req.body;
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

app.get("/comments/:id/:ser", cors(corsOptions), async (req, res) => {
  try {
    const { id, ser } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments where gy_id = $1 and project_id = $2 ORDER BY added DESC",
      [id, ser]
    );
    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/graveyards/:id", cors(corsOptions), async (req, res) => {
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
