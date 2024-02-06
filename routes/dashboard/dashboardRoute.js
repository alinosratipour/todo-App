const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/dashboard", async (req, res) => {
  try {
    const userId = req.headers.token;

    const user = await pool.query("SELECT firstname FROM users WHERE id = $1", [
      userId,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server errors");
  }
});

module.exports = router;
