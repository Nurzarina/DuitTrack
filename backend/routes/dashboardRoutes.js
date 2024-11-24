const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

// Fetch dashboard data
app.get("/", (req, res) => {
    const userId = 2;   // Later need to modify this so userID is received from frontend.

    const query = `
        SELECT SUM(amount) AS totalExpenses
        FROM expenses
        WHERE user_id = ?;
        `;

    const budgetQuery = `
        SELECT SUM(spending_limit) AS monthlyBudget FROM categories WHERE user_id = ?;
        `;

    const categoryQuery = `
        SELECT categories.name, categories.spending_limit AS limit,
            IFNULL(SUM(expenses.amount), 0) AS spent
        FROM categories
        LEFT JOIN expenses ON categories.id = expenses.category_id
        WHERE categories.user_id = ?
        GROUP BY categories.id,
        `;

    db.query(query, [userId], (err, expensesResult) => {
        if (err) return res.status(500).json({ error: "Error fetching expenses data" });

        db.query(budgetQuery, [userId], (err, budgetResult) => {
            if (err) return res.status(500).json({ error: "Error fetching budget data" });

            db.query(categoryQuery, [userId], (err, categoryResult) => {
                if (err) return res.status(500).json({ error: "Error fetching category data" });

                // Default fallback values
                const totalExpenses= expensesResult[0]?.totalExpenses || 0;
                const monthlyBudget= budgetResult[0]?.monthlyBudget || 0;
                const categoryData= categoryResult.length ?categoryResult: [
                    { name: "No Data", limit: 0, spent: 0 },
                ];

                res.json({
                    totalExpenses,
                    monthlyBudget,
                    categoryData,
                });
            });
        });
    });
});

module.exports = router;