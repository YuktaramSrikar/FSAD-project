const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcryptjs');

let pool;

async function initDB() {
    try {
        // Create connection pool without specifying database first to create it if it doesn't exist
        const tempPool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const dbName = process.env.DB_NAME || 'career_assessment';

        // Create database if it doesn't exist
        await tempPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempPool.end();

        // Now connect to the specific database
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(`Connected to MySQL database: ${dbName}`);

        // Create tables
        await pool.query(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text TEXT NOT NULL,
        category VARCHAR(255) NOT NULL
      )
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        career_path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        role ENUM('admin', 'student') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Modify results table to add user_id foreign key if not exists
        const [resultsColumns] = await pool.query("SHOW COLUMNS FROM results LIKE 'user_id'");
        if (resultsColumns.length === 0) {
            await pool.query('ALTER TABLE results ADD COLUMN user_id INT');
            await pool.query('ALTER TABLE results ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
            console.log('Updated results table with user_id foreign key.');
        }

        // Modify users table to add full_name if not exists
        const [usersColumns] = await pool.query("SHOW COLUMNS FROM users LIKE 'full_name'");
        if (usersColumns.length === 0) {
            await pool.query('ALTER TABLE users ADD COLUMN full_name VARCHAR(255)');
            console.log('Added full_name column to users table.');
        }

        // Users table created - no default accounts seeded
        console.log('Users table initialized. Create accounts via admin panel.');

        // Check if questions are empty and seed
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM questions');
        if (rows[0].count === 0) {
            const seedData = [
                ['I enjoy solving complex mathematical problems.', 'technology'],
                ['I like leading teams and taking charge of projects.', 'business'],
                ['I am passionate about creating art and design.', 'creative'],
                ['I naturally want to help others with their emotional problems.', 'social'],
                ['I enjoy working with machinery or building things.', 'engineering']
            ];

            for (const q of seedData) {
                await pool.query('INSERT INTO questions (text, category) VALUES (?, ?)', q);
            }
            console.log('Seeded MySQL database with initial questions.');
        }
    } catch (error) {
        console.error('Database connection or initialization failed:', error);
    }
}

function getPool() {
    return pool;
}

module.exports = { initDB, getPool };
