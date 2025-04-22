// server.js
const http    = require('http');
const mysql   = require('mysql2');
const { URL } = require('url');
const admin   = require('./admin');
const student = require('./student');
const store   = require('./store');

const CORS = {
    'Access-Control-Allow-Origin':  'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

// Define all GET routes here, with optional `params` arrays
const GET_ROUTES = {
    '/admin/book/getAll':  { handler: admin.adminGetBooks, params: [] },
    '/admin/book/get':     { handler: store.fetchBook,    params: ['book_id'] },
    '/admin/ebook/getAll': { handler: admin.adminGetEbook, params: [] },
    '/admin/ebook/get':    { handler: store.fetchEbook,   params: ['ebook_id'] },
    '/admin/user/getAll':  { handler: admin.adminGetUsers, params: [] },
    '/student/profile':    { handler: store.fetchUser, params: ['email']},
    '/student/profile/getCourse': { handler: store.fetchCourse, params: ['ucid'] },
    '/admin/order/getAll': { handler: admin.adminGetOrders, params: [] }

};

const POST_ROUTES = {
    '/register':               student.studentSignup,
    '/login':                  student.studentLogin,
    '/admin/login':            admin.adminLogin,
    '/admin/book/insert':      admin.adminInsertBook,
    '/admin/ebook/insert':     admin.adminInsertEbook,
    '/admin/book/delete':      admin.adminDeleteBook,
    '/admin/ebook/delete':     admin.adminDeleteEbook,
    '/admin/book/update':      admin.adminUpdateBook,
    '/admin/ebook/update':     admin.adminUpdateEbookPrice,
    '/student/profile/course': student.addCourse,
    '/student/profile/deleteCourse': student.deleteCourse,
    '/admin/user/delete': admin.adminDeleteUser 
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
    Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === 'GET') {
        const parsedURL = new URL(req.url, `http://${req.headers.host}`);
        const routeDef = GET_ROUTES[parsedURL.pathname];

        if (routeDef) {
            const args = (routeDef.params || [])
                .map(name => parsedURL.searchParams.get(name));
            return routeDef.handler(db, ...args, res);
        }

        res.writeHead(404);
        return res.end('Not Found');
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data    = JSON.parse(body);
                const handler = POST_ROUTES[req.url];
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