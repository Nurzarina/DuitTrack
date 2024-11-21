const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

const SECRET = process.env.JWT_SECRET;

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);          // For debugging purpose

    if (!username || !password) return res.status(400).send('All fields are required');

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);          // For debugging purpose

    const sql = "INSERT INTO users (username, password) VALUES (?,?)";

    // query for debugging purpose
    db.query("SELECT 1", (err, result) => {
        if (err) console.error("Database connection failed:", err);
        else console.log("Database connection is working!");
    });

    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error("SQL Error:", err.message);
            return res.status(500).send('User Registration failed.');
        }
        res.status(201).send('User Account created successfully!');
    });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users where username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err || result.length === 0) return res.status(400).send('Invalid credentials.')

        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).send('Invalid Credentials.');

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });

        res.json({ token, username: user.username });
    });
});

// Protected Route
router.get('/user', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token required.');

    try {
        const decoded = jwt.verify(token, SECRET);
        res.send('Welcome, User!');
    } catch (err) {
        res.status(403).send('Invalid token.')
    }
});

module.exports = router;