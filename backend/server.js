const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
