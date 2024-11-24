// Routes available in this file:
// 1. Get categories by user_id
// 2. Add a new category for a user
// 3. Delete a category

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
  const { user_id, name, spending_limit } = req.body;
  if (!user_id || !name || !spending_limit) {
    return res.status(400).send("User ID, name, and spending_limit are required.");
  }

  const sql = "INSERT INTO categories (user_id, name, spending_limit) VALUES (?, ?, ?)";
  db.query(sql, [user_id, name, spending_limit], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to add category.");
    }
    res.json({ id: result.insertId, user_id, name, spending_limit });
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

// Update a category
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, spending_limit } = req.body;

 const updateQuery = `
 UPDATE categories
 SET name = ?, spending_limit = ?
 WHERE id = ?
 `;

 try {
  db.query(updateQuery, [ name, spending_limit, id ], (error, results) => {
      if (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ error: 'Failed to update category'});
      }

      if (results.affectedRows > 0) {
        res.json({ id, name, spending_limit});
      } else {
        res.status(404).json({ error: 'Category not found'});
      }
    });
 }  catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Failed to update category' });
 }
});

module.exports = router;
