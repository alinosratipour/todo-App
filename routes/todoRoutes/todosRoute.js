const express = require("express");
const router = express.Router();
const pool = require("../../db");
const authorization = require("../../middleware/authorization");

//List All toDos
router.get("/todos", async (req, res) => {
  try {

//  const user = await pool.query(
//    " SELECT firstname FROM users    WHERE id = $1",
//    [req.user]
//  );
 //res.json(user.rows[0]); 

    const listtodos = await pool.query("SELECT * FROM todo");
    res.json(listtodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.delete("/todos/:id", async (req, res) => {
  try {
      const { id } = req.params;
      // Perform deletion operation in the database using the id
      await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      res.json("Todo item deleted successfully");
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
});

module.exports = router;
