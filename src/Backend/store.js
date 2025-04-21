const fetchBook = (db, bookId, res) => {
    if (!bookId) {
        res.statusCode = 400;
        return res.end('Missing required query parameter: book_id');
    }
    const sql = `
    SELECT author, name, price, genre, cover_image
    FROM Book
    WHERE book_id = ?
  `;
    db.query(sql, [bookId], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving book');
        }
        if (results.length === 0) {
            res.statusCode = 404;
            return res.end('Book not found');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results[0]));
    });
};


const fetchEbook = (db, EbookId, res) => {
    if (!EbookId) {
        res.statusCode = 400;
        return res.end('Missing required query parameter: Ebook_id');
    }
    const sql = `
    SELECT author, name, price, genre, cover_image
    FROM Ebook
    WHERE ebook_id = ?
  `;
    db.query(sql, [EbookId], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving book');
        }
        if (results.length === 0) {
            res.statusCode = 404;
            return res.end('Book not found');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results[0]));
    });
};

const fetchUser = (db, email, res) => {
    if (!email) {
        res.statusCode = 400;
        return res.end('Missing required query parameter: Ebook_id');
    }
    const sql = 'SELECT ucid, first_name, last_name, email FROM Student WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving user')
        }
        if (results.length === 0) {
            res.statusCode = 404;
            return res.end('User not found');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results[0]));
    })
}

const fetchCourse = (db, ucid, res) => {
    if (!ucid) {
        res.statusCode = 400;
        return res.end('Missing required query parameter: ucid');
    }
    const sql = 'SELECT course_id FROM Student_Course WHERE ucid = ?';
    db.query(sql, [ucid], (err, results) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving courses');
        }
        const courseIds = results.map(row => row.course_id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(courseIds));
    });
};

module.exports = {fetchBook, fetchEbook, fetchUser, fetchCourse};