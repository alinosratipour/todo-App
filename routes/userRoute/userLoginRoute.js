const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const authorization = require("../../middleware/authorization");

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Destructure the req.body
    const { email, password } = req.body;

    // Check if user exists
    const userPass = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if user does not exist
    if (userPass.rows.length === 0) {
      return res.status(401).json("User does not exist");
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      password,
      userPass.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).json("Password or email is wrong");
    }

    // If everything is okay, provide the user's ID in the response
    res.json({ token: "login success", userId: userPass.rows[0].id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
