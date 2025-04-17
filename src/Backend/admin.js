// admin.js
// Functions for admin-related actions

const adminLogin = (db, data, res) => {
    const { email, password } = data;
    if (!email || !password) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'SELECT * FROM Owner WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error during admin login');
        }
        if (results.length > 0) {
            res.statusCode = 200;
            res.end('Admin logged in successfully, ID: ' + results[0].admin_id);
        } else {
            res.statusCode = 401;
            res.end('Invalid email or password');
        }
    });
};

const adminInsertBook = (db, data, res) => {
    const { book_id, author, name, stock, price, genre } = data;
    if (!book_id || !author || !name || stock == null || price == null || !genre) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'INSERT INTO Book (book_id, author, name, stock, price, genre) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [book_id, author, name, stock, price, genre], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error inserting book');
        }
        res.statusCode = 201;
        res.end('Book inserted successfully, ID: ' + result.insertId);
    });
};

const adminInsertEbook = (db, data, res) => {
    const { ebook_id, author, name, stock, price, genre, rental } = data;
    if (!ebook_id || !author || !name || stock == null || price == null || !genre || rental == null) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql =
        'INSERT INTO Ebook (ebook_id, author, name, stock, price, genre, rental) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ebook_id, author, name, stock, price, genre, rental], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error inserting ebook');
        }
        res.statusCode = 201;
        res.end('Ebook inserted successfully, ID: ' + result.insertId);
    });
};

const adminDeleteBook = (db, data, res) => {
    const { book_id } = data;
    if (!book_id) {
        res.statusCode = 400;
        return res.end('Missing required field: book_id');
    }
    const sql = 'DELETE FROM Book WHERE book_id = ?';
    db.query(sql, [book_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error deleting book');
        }
        res.statusCode = 200;
        res.end('Book deleted successfully, affected rows: ' + result.affectedRows);
    });
};

const adminDeleteEbook = (db, data, res) => {
    const { ebook_id } = data;
    if (!ebook_id) {
        res.statusCode = 400;
        return res.end('Missing required field: ebook_id');
    }
    const sql = 'DELETE FROM Ebook WHERE ebook_id = ?';
    db.query(sql, [ebook_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error deleting ebook');
        }
        res.statusCode = 200;
        res.end('Ebook deleted successfully, affected rows: ' + result.affectedRows);
    });
};

const adminAddBookStock = (db, data, res) => {
    const { book_id, amount } = data;
    if (!book_id || amount == null) {
        res.statusCode = 400;
        return res.end('Missing required fields: book_id or amount');
    }
    const sql = 'UPDATE Book SET stock = stock + ? WHERE book_id = ?';
    db.query(sql, [amount, book_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error updating book stock');
        }
        res.statusCode = 200;
        res.end('Book stock updated successfully, affected rows: ' + result.affectedRows);
    });
};

// Add fetch book information and add pictures

const adminAddEbookStock = (db, data, res) => {
    const { ebook_id, amount } = data;
    if (!ebook_id || amount == null) {
        res.statusCode = 400;
        return res.end('Missing required fields: ebook_id or amount');
    }
    const sql = 'UPDATE Ebook SET stock = stock + ? WHERE ebook_id = ?';
    db.query(sql, [amount, ebook_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error updating ebook stock');
        }
        res.statusCode = 200;
        res.end('Ebook stock updated successfully, affected rows: ' + result.affectedRows);
    });
};
// Add function to modify price


const adminGetBooks = (db, res) => {
    const sql = 'SELECT book_id, name, stock, price FROM Book';
    db.query(sql, (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving books');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    });
};

module.exports = {
    adminLogin,
    adminInsertBook,
    adminInsertEbook,
    adminDeleteBook,
    adminDeleteEbook,
    adminAddBookStock,
    adminAddEbookStock,
    adminGetBooks
};