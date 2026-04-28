# MySQL CRUD Commands for Career Assessment Tool

This guide provides SQL commands for CRUD operations in MySQL Workbench for your Career Assessment Tool database.

## Database & Tables Overview

```sql
-- Select the database
USE career_assessment;

-- View all tables
SHOW TABLES;

-- View table structure
DESCRIBE users;
DESCRIBE questions;
DESCRIBE results;
```

---

## CREATE (INSERT) Operations

### 1. Create a New User Account

```sql
-- Insert a new admin user
INSERT INTO users (username, password, role) 
VALUES ('admin_user', '$2a$10$...hashed_password...', 'admin');

-- Insert a new student user
INSERT INTO users (username, password, role) 
VALUES ('student_user', '$2a$10$...hashed_password...', 'student');
```

**Note**: Passwords must be bcrypt hashed. Use the `create-user.js` script instead for proper hashing.

### 2. Add Assessment Questions

```sql
-- Insert a single question
INSERT INTO questions (text, category) 
VALUES ('I enjoy solving complex mathematical problems.', 'technology');

-- Insert multiple questions at once
INSERT INTO questions (text, category) VALUES
('I enjoy solving complex mathematical problems.', 'technology'),
('I like leading teams and taking charge of projects.', 'business'),
('I am passionate about creating art and design.', 'creative'),
('I naturally want to help others with their emotional problems.', 'social'),
('I enjoy working with machinery or building things.', 'engineering');
```

### 3. Add Assessment Results

```sql
-- Insert assessment result
INSERT INTO results (student_name, career_path) 
VALUES ('John Doe', 'Software Engineer');

-- Insert with manual timestamp
INSERT INTO results (student_name, career_path, timestamp) 
VALUES ('Jane Smith', 'Project Manager', NOW());
```

---

## READ (SELECT) Operations

### 1. View All Users

```sql
-- Get all users
SELECT * FROM users;

-- Get all users with specific columns
SELECT id, username, role FROM users;

-- Get users by role
SELECT * FROM users WHERE role = 'admin';
SELECT * FROM users WHERE role = 'student';

-- Count users by role
SELECT role, COUNT(*) as count FROM users GROUP BY role;
```

### 2. View All Questions

```sql
-- Get all questions
SELECT * FROM questions;

-- Get questions by category
SELECT * FROM questions WHERE category = 'technology';

-- Count questions by category
SELECT category, COUNT(*) as count FROM questions GROUP BY category;

-- Get specific question
SELECT * FROM questions WHERE id = 1;
```

### 3. View All Assessment Results

```sql
-- Get all results
SELECT * FROM results;

-- Get results ordered by newest first
SELECT * FROM results ORDER BY timestamp DESC;

-- Get results for a specific career
SELECT * FROM results WHERE career_path = 'Software Engineer';

-- Count how many chose each career
SELECT career_path, COUNT(*) as count FROM results GROUP BY career_path;

-- Get results from today
SELECT * FROM results WHERE DATE(timestamp) = CURDATE();

-- Get results for a specific student
SELECT * FROM results WHERE student_name = 'John Doe';

-- Get most popular career
SELECT career_path, COUNT(*) as count FROM results GROUP BY career_path ORDER BY count DESC LIMIT 1;
```

### 4. Advanced Queries

```sql
-- Statistics overview
SELECT 
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM questions) as total_questions,
    (SELECT COUNT(*) FROM results) as total_assessments;

-- Career distribution
SELECT career_path, COUNT(*) as count, ROUND(100*COUNT(*)/(SELECT COUNT(*) FROM results),2) as percentage
FROM results
GROUP BY career_path
ORDER BY count DESC;

-- Student participation summary
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as assessments,
    COUNT(DISTINCT student_name) as unique_students
FROM results
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- View user with most recent login (if timestamp column exists)
SELECT * FROM users LIMIT 5;
```

---

## UPDATE Operations

### 1. Update User Information

```sql
-- Change user role
UPDATE users SET role = 'admin' WHERE username = 'john_doe';

-- Update password (should use create-user.js instead)
UPDATE users SET password = '$2a$10$...new_hashed_password...' WHERE id = 1;

-- Update multiple users
UPDATE users SET role = 'student' WHERE id > 5;
```

### 2. Update Results

```sql
-- Modify career path for a result
UPDATE results SET career_path = 'Data Scientist' WHERE id = 1;

-- Update student name (if misspelled)
UPDATE results SET student_name = 'Jane Doe' WHERE student_name = 'Jane Deo';

-- Bulk update
UPDATE results SET career_path = 'Software Engineer' WHERE career_path = 'Developer';
```

### 3. Conditional Updates

```sql
-- Update results for a specific student
UPDATE results 
SET career_path = 'Project Manager' 
WHERE student_name = 'John Doe' AND timestamp > DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Update all old results
UPDATE results 
SET career_path = 'Updated: ' + career_path 
WHERE timestamp < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

---

## DELETE Operations

### 1. Delete Users

```sql
-- Delete a specific user by ID
DELETE FROM users WHERE id = 5;

-- Delete a specific user by username
DELETE FROM users WHERE username = 'testuser';

-- Delete all student but keep admins (CAUTION!)
DELETE FROM users WHERE role = 'student';

-- Delete user and verify
DELETE FROM users WHERE username = 'john_doe';
SELECT COUNT(*) FROM users;
```

### 2. Delete Results

```sql
-- Delete a specific result
DELETE FROM results WHERE id = 10;

-- Delete results for a specific student
DELETE FROM results WHERE student_name = 'John Doe';

-- Delete old results (older than 30 days)
DELETE FROM results WHERE timestamp < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Delete all results for a specific career
DELETE FROM results WHERE career_path = 'Software Engineer';
```

### 3. Delete Questions

```sql
-- Delete a specific question
DELETE FROM questions WHERE id = 5;

-- Delete questions by category
DELETE FROM questions WHERE category = 'technology';

-- Delete all questions (CAUTION - requires new assessment)
DELETE FROM questions;
```

### 4. Clear Tables (Nuclear Option)

```sql
-- Clear all data from results
DELETE FROM results;

-- Clear all data from users
DELETE FROM users;

-- Reset auto-increment counter
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE questions AUTO_INCREMENT = 1;
ALTER TABLE results AUTO_INCREMENT = 1;
```

---

## Utility Commands

### 1. Table Information

```sql
-- Get table structure
DESC users;
DESC questions;
DESC results;

-- Get table size
SELECT 
    TABLE_NAME,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'career_assessment';

-- Get row count for all tables
SELECT TABLE_NAME, TABLE_ROWS FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'career_assessment';
```

### 2. Backup & Restore Data

```sql
-- Export to CSV (results)
SELECT * FROM results INTO OUTFILE '/path/to/results.csv' FIELDS TERMINATED BY ',';

-- Count operations
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM questions;
SELECT COUNT(*) FROM results;

-- Check for duplicates
SELECT username, COUNT(*) FROM users GROUP BY username HAVING COUNT(*) > 1;
```

### 3. Transaction Operations

```sql
-- Start transaction
START TRANSACTION;

-- Insert data
INSERT INTO users (username, password, role) VALUES ('test_user', 'hashed_pwd', 'student');
INSERT INTO results (student_name, career_path) VALUES ('Test Student', 'Test Career');

-- Commit changes
COMMIT;

-- Or rollback if needed
ROLLBACK;
```

---

## Best Practices

### Security
- ✅ Never store passwords as plaintext
- ✅ Use prepared statements to prevent SQL injection
- ✅ Use transactions for multi-step operations
- ✅ Always verify deletions before executing

### Common Tasks

```sql
-- Complete user registration flow
START TRANSACTION;
INSERT INTO users (username, password, role) VALUES ('new_user', 'hashed_password', 'student');
INSERT INTO results (student_name, career_path) VALUES ('New User', 'Undecided');
COMMIT;

-- Audit user activity
SELECT username, role, COUNT(*) as results_count 
FROM users u 
LEFT JOIN results r ON u.username = r.student_name 
GROUP BY u.id;

-- Find inactive users
SELECT username FROM users WHERE id NOT IN (SELECT DISTINCT student_name FROM results);
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Duplicate entry for key | Username already exists | Use different username or delete old user first |
| Foreign key constraint failed | Cannot delete referenced data | Delete dependent records first |
| Syntax error | Incorrect SQL syntax | Check query for typos, quotes, commas |
| No database selected | Database not selected | Use `USE career_assessment;` first |
| Access denied | Incorrect permissions | Login with correct credentials |

---

## Hot Keys in MySQL Workbench

| Action | Shortcut |
|--------|----------|
| Execute Query | Ctrl + Enter (or Cmd + Enter on Mac) |
| Execute Selected | Ctrl + Shift + Enter |
| Format Query | Ctrl + B |
| Find | Ctrl + F |
| Replace | Ctrl + H |
| New Query Tab | Ctrl + T |
| Save | Ctrl + S |

---

## Tips for Career Assessment Tool

```sql
-- See current database stats
SELECT 
    'Users' as metric, COUNT(*) as count FROM users
UNION ALL
SELECT 'Questions', COUNT(*) FROM questions
UNION ALL
SELECT 'Results', COUNT(*) FROM results;

-- Most active day
SELECT DATE(timestamp) as date, COUNT(*) as assessments
FROM results
GROUP BY DATE(timestamp)
ORDER BY assessments DESC
LIMIT 1;

-- User engagement report
SELECT 
    u.username,
    u.role,
    COUNT(r.id) as assessments_taken
FROM users u
LEFT JOIN results r ON u.username = r.student_name
GROUP BY u.id, u.username, u.role
ORDER BY assessments_taken DESC;
```

---

**For automated operations**, always use the `create-user.js` script for user creation to ensure proper password hashing!
