const express = require("express");
const router = express.Router();
const pool = require("../../db");
const auhorization = require("../../middleware/authorization");

//auhorization,
router.get("/dashboard",auhorization, async (req, res) => {
  try {
    //req.user has the payload

    const user = await pool.query(
      " SELECT firstname FROM users   WHERE id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    // res.status(500).json("server errors");
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

module.exports = router;
