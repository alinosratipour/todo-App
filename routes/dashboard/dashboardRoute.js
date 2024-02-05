const express = require("express");
const router = express.Router();
const pool = require("../../db");
const auhorization = require("../../middleware/authorization");

router.get("/dashboard", async (req, res) => {
  try {
    //req.user has the payload
    console.log("User ID:", req.user);
    const user = await pool.query(
      " SELECT firstname FROM users   WHERE id = $1",
      [req.user]
    );
    console.log("User Data:", user.rows[0]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server errors");
  }
});

module.exports = router;
