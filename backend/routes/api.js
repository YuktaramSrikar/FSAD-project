const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const pool = req.pool;

        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: { 
                id: user.id,
                username: user.username, 
                full_name: user.full_name || user.username,
                role: user.role 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware to verify token for protected routes
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Get all questions
router.get('/questions', async (req, res) => {
    try {
        const pool = req.pool;
        const [rows] = await pool.query('SELECT * FROM questions');
        res.json({ questions: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit assessment results
router.post('/submit', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: 'Only students can submit assessments' });
        }

        const { answers } = req.body;
        let maxScore = -999;
        let topCategory = 'Undecided';

        for (const [category, score] of Object.entries(answers || {})) {
            if (score > maxScore) {
                maxScore = score;
                topCategory = category;
            }
        }

        const recommendations = {
            technology: 'Software Engineer',
            business: 'Project Manager',
            creative: 'Graphic Designer',
            social: 'Counselor',
            engineering: 'Mechanical Engineer',
            Undecided: 'General Studies'
        };

        const careerPath = recommendations[topCategory] || recommendations.Undecided;

        const pool = req.pool;
        // Get the user's full name from the users table
        const [userRows] = await pool.query('SELECT full_name, username FROM users WHERE id = ?', [req.user.id]);
        const userName = userRows[0]?.full_name || userRows[0]?.username || 'Anonymous Student';

        // Insert result with user_id to maintain referential integrity
        const [result] = await pool.query(
            'INSERT INTO results (user_id, student_name, career_path) VALUES (?, ?, ?)',
            [req.user.id, userName, careerPath]
        );

        res.json({
            message: 'Assessment submitted successfully.',
            careerPath,
            resultId: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin metrics
router.get('/admin/metrics', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const pool = req.pool;
        const [distributionRows] = await pool.query('SELECT career_path, COUNT(*) as count FROM results GROUP BY career_path');
        const [totalRows] = await pool.query('SELECT COUNT(*) as total FROM results');

        res.json({
            totalParticipants: totalRows[0].total || 0,
            careerDistribution: distributionRows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
