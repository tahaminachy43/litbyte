const http = require('http');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wuhanyu89',
    database: 'LitByte'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database!');
});

const studentSignup = (data, res) => {
    const { ucid, email, password, first_name, last_name } = data;
    if (!ucid || !email || !password || !first_name || !last_name) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'INSERT INTO Student (ucid, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [ucid, email, password, first_name, last_name], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error inserting student');
        }
        res.statusCode = 201;
        res.end('Student signed up successfully, ID: ' + result.insertId);
    });
};

const studentLogin = (data, res) => {
    const { email, password } = data;
    if (!email || !password) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'SELECT * FROM Student WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error during login');
        }
        if (results.length > 0) {
            res.statusCode = 200;
            res.end('Student logged in successfully, UCID: ' + results[0].ucid);
        } else {
            res.statusCode = 401;
            res.end('Invalid email or password');
        }
    });
};

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (req.url === '/student/signup') {
                    studentSignup(data, res);
                } else if (req.url === '/student/login') {
                    studentLogin(data, res);
                } else {
                    res.statusCode = 404;
                    res.end('Not Found');
                }
            } catch (e) {
                res.statusCode = 400;
                res.end('Invalid JSON');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000);