const http = require('http');
const mysql = require('mysql2');
const admin = require('./admin');
const student = require('./student');

// CORS headers to allow requests from the front-end running on port 3001
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const routes = {
    'POST': {
        '/register': student.studentSignup,
        '/login': student.studentLogin,
        '/adminlogin': admin.adminLogin,
        '/admin/book/insert': admin.adminInsertBook,
        '/admin/Ebook/insert': admin.adminInsertEbook,
        '/admin/book/stock/add': admin.adminAddBookStock,
        '/admin/Ebook/stock/add': admin.adminAddEbookStock,
        '/admin/book/delete': admin.adminDeleteBook,
        '/admin/Ebook/delete': admin.adminDeleteEbook
    },
    'GET': {
        '/admin/book/getAll': admin.adminGetBooks
    }
};

// MySQL connection setup
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

// HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers on every request
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const method = req.method;
    const path = req.url;

    if (method === 'GET') {
        const handler = routes.GET[path];
        if (handler) {
            return handler(db, res);
        }
        res.statusCode = 404;
        return res.end('Not Found');
    }

    if (method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const handler = routes.POST[path];
                if (handler) {
                    return handler(db, data, res);
                }
                res.statusCode = 404;
                res.end('Not Found');
            } catch (err) {
                res.statusCode = 400;
                res.end('Invalid JSON');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Start listening on port 3000 (back-end)
server.listen(3000, () => console.log('Server running on port 3000'));