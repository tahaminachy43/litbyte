// server.js
const http = require('http');
const mysql = require('mysql2');
const admin = require('./admin');
const student = require('./student');

const routes = {
    'POST': {
        '/student/signup': student.studentSignup,
        '/student/login': student.studentLogin,
        '/admin/login': admin.adminLogin,
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

const server = http.createServer((req, res) => {
    const method = req.method;
    const path = req.url;

    if (method === 'GET') {
        const handler = routes['GET'][path];
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
                const handler = routes['POST'][path];
                if (handler) {
                    return handler(db, data, res);
                }
                res.statusCode = 404;
                res.end('Not Found');
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

server.listen(3000, () => console.log('Server running on port 3000'));