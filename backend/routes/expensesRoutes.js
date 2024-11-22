// Routes available in this file:

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("../config/db");
const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all expenses details.
// User and category information is obtained from tables 'users' and 'categories'.
app.get("/expenses", (req,res) => {
    db.query(
        `SELECT expenses.id, expenses.date, expenses.amount, expenses.notes, 
        users.username, 
        categories.name AS category_name 
        FROM expenses 
        JOIN users ON expenses.user_id = users.id 
        JOIN categories ON expenses.category_id = categories.id`, 
        (err,results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add new expense
app.post("/expenses", (req, res) => {
    const { user_id, category_id, date, amount, notes } = req.body;

    //Validate the user_id from the request body
    if (!user_id) {
        return res.status(400).send("User ID is required.");
    }

    db.query(
        "INSERT INTO expenses (user_id, category_id, date, amount, notes) VALUES (?, ?, ?, ?, ?)", [user_id, category_id, date, amount, notes],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error adding expense.");
            }
            res.send("Expenses added successfully!");
        }
    );
});

// Delete an expense
app.delete("/expenses/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM expenses WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send("Expenses deleted!");
    });
});

module.exports = router;