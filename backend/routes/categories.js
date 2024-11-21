const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Get categories by user_id
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  const sql = "SELECT * FROM categories WHERE user_id = ?";
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to fetch categories.");
    }
    res.json(results);
  });
});

// Add a new category for a user
router.post("/", (req, res) => {
  const { user_id, name, limit } = req.body;
  if (!user_id || !name || !limit) {
    return res.status(400).send("User ID, name, and limit are required.");
  }

  const sql = "INSERT INTO categories (user_id, name, limit) VALUES (?, ?, ?)";
  db.query(sql, [user_id, name, limit], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to add category.");
    }
    res.json({ id: result.insertId, user_id, name, limit });
  });
});

// Delete a category
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM categories WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to delete category.");
      }
      res.sendStatus(204);
    });
  });
  

module.exports = router;