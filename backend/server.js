require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB, getPool } = require('./database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Career Assessment Tool API with MySQL is running.');
});

// Initialize Database connection and schema
initDB().then(() => {
    console.log('Database initialization completed.');
    // Inject database pool into request
    app.use((req, res, next) => {
        req.pool = getPool();
        next();
    });

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to initialize database", err);
});
