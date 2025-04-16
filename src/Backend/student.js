const studentSignup = (db, data, res) => {
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

const studentLogin = (db, data, res) => {
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
            res.end('Student logged in successfully');
        } else {
            res.statusCode = 401;
            res.end('Invalid email or password');
        }
    });
};

module.exports = {
    studentSignup,
    studentLogin
};