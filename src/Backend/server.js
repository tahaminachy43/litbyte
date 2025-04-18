const http    = require('http');
const mysql   = require('mysql2');
const admin   = require('./admin');
const student = require('./student');
const store   = require('./store');  // ← your new module

const CORS = {
    'Access-Control-Allow-Origin':  'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const routes = {
    POST: {
        '/register':               student.studentSignup,
        '/login':                  student.studentLogin,
        '/adminlogin':             admin.adminLogin,
        '/admin/book/insert':      admin.adminInsertBook,
        '/admin/Ebook/insert':     admin.adminInsertEbook,
        '/admin/book/delete':      admin.adminDeleteBook,
        '/admin/Ebook/delete':     admin.adminDeleteEbook
    },
    GET: {
        '/admin/book/getAll':      admin.adminGetBooks,
        '/admin/ebook/getAll':     admin.adminGetEbook,
        '/admin/user/getAll':      admin.adminGetUsers,
    }
};

const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'wuhanyu89',
    database: 'LitByte'
});
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

const server = http.createServer((req, res) => {
    Object.entries(CORS).forEach(([k,v]) => res.setHeader(k, v));
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const { method, url } = req;

    if (method === 'GET') {
        const handler = routes.GET[url];
        if (handler) return handler(db, res);
        res.writeHead(404);
        return res.end('Not Found');
    }

    if (method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const handler = routes.POST[url];
                if (handler) return handler(db, data, res);
                res.writeHead(404);
                res.end('Not Found');
            } catch {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
        return;
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(3000, () => console.log('Server running on port 3000'));