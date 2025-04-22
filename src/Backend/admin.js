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
            res.end('Admin logged in successfully');
        } else {
            res.statusCode = 401;
            res.end('Invalid email or password');
        }
    });
};

const adminInsertBook = (db, data, res) => {
    const { book_id, author, name, stock, price, genre, cover_page } = data;
    if (!book_id || !author || !name || stock == null || price == null || !genre) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'INSERT INTO Book (book_id, author, name, stock, price, genre, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [book_id, author, name, stock, price, genre, cover_page], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error inserting book');
        }
        res.statusCode = 201;
        res.end('Book inserted successfully, ID: ' + result.insertId);
    });
};

const adminInsertEbook = (db, data, res) => {
    const { ebook_id, author, name, stock, price, genre, rental, cover_page } = data;
    if (!ebook_id || !author || !name || stock == null || price == null || !genre || rental == null) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql =
        'INSERT INTO Ebook (ebook_id, author, name, stock, price, genre, rental, cover_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [ebook_id, author, name, stock, price, genre, rental, cover_page], (err, result) => {
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

const adminUpdateBook = (db, data, res) => {
    const { book_id, stock, price } = data;
    if (!book_id || (stock == null && price == null)) {
        res.statusCode = 400;
        return res.end('Missing book_id or no fields to update');
    }
    const sets = [];
    const vals = [];
    if (stock != null) {
        sets.push('stock = ?');
        vals.push(stock);
    }
    if (price != null) {
        sets.push('price = ?');
        vals.push(price);
    }
    const sql = `UPDATE Book SET ${sets.join(', ')} WHERE book_id = ?`;
    vals.push(book_id);

    db.query(sql, vals, (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error updating book');
        }
        res.statusCode = 200;
        res.end('Book updated successfully, affectedRows: ' + result.affectedRows);
    });
};

const adminUpdateEbookPrice = (db, data, res) => {
    const { ebook_id, price } = data;
    if (!ebook_id || price == null) {
        res.statusCode = 400;
        return res.end('Missing required fields: ebook_id or price');
    }
    const sql = 'UPDATE Ebook SET price = ? WHERE ebook_id = ?';
    db.query(sql, [price, ebook_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error updating ebook price');
        }
        res.statusCode = 200;
        res.end('Ebook price updated successfully, affectedRows: ' + result.affectedRows);
    });
};

// Add fetch book information and add pictures

// Add function to modify price

const adminDeleteUser = (db, data, res) => {
    const { user_id } = data;
    if (!user_id) {
        res.statusCode = 400;
        return res.end('Missing required field: user_id');
    }
    const sql = 'DELETE FROM Student WHERE ucid = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error deleting user');
        }
        res.statusCode = 200;
        res.end('User deleted successfully, affected rows: ' + result.affectedRows);
    });
};


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

const adminGetEbook = (db, res) => {
    const sql = 'SELECT Ebook_id, name, price FROM Ebook';
    db.query(sql, (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving Ebooks');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
};

const adminGetUsers = (db, res) => {
    const sql = 'SELECT ucid, email, first_name, last_name FROM Student';
    db.query(sql, (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving users')
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
    })
}
const adminGetOrders = (db, res) => {
    const sql = 'SELECT Order_ID, Total_Price FROM Orders';
    db.query(sql, (err, results) => {
      if (err) {
        res.statusCode = 500;
        return res.end('Error retrieving orders');
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
    adminUpdateBook,
    adminUpdateEbookPrice,
    adminGetBooks,
    adminGetEbook,
    adminGetUsers,
    adminDeleteUser,
    adminGetOrders
};