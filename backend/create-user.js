const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createUser(username, password, role, fullName) {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'career_assessment',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            console.error(`❌ User '${username}' already exists!`);
            await pool.end();
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user with full_name
        await pool.query('INSERT INTO users (username, password, full_name, role) VALUES (?, ?, ?, ?)', 
            [username, hashedPassword, fullName || username, role]);

        console.log(`✅ User '${username}' created successfully with role '${role}' and name '${fullName || username}'`);
        await pool.end();
    } catch (error) {
        console.error('Error creating user:', error.message);
        process.exit(1);
    }
}

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('Usage: node create-user.js <username> <password> <role> [fullName]');
    console.log('Example: node create-user.js johndoe password123 student "John Doe"');
    console.log('Roles: admin, student');
    process.exit(1);
}

const [username, password, role, fullName] = args;

// Validate role
if (!['admin', 'student'].includes(role)) {
    console.error('❌ Invalid role! Must be "admin" or "student"');
    process.exit(1);
}

// Validate password strength
if (password.length < 6) {
    console.error('❌ Password must be at least 6 characters long');
    process.exit(1);
}

createUser(username, password, role, fullName);
