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


const fetchTopBooks = (db, res) => {
    const sql = `
        SELECT
            book_id,
            name,
            author,
            price,
            course_id,
            cover_image
        FROM Book
        ORDER BY book_id DESC
        LIMIT 5
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching top books:', err);
            return res.status(500).send('Error fetching top books');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));

    });
};

const fetchAllBooks = (db, res) => {
    const sql = `
        SELECT
            book_id,
            name,
            author,
            price,
            course_id,
            cover_image
        FROM Book
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).send('Error fetching books');
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));

    });
};

const fetchRecBooks = (db, ucid, res) => {
    if (!ucid) {
        res.statusCode = 400;
        return res.end('Missing required query parameter: ucid');
    }

    // 1) Get all course_ids for this student
    const sqlCourses = `SELECT course_id FROM Student_Course WHERE ucid = ?`;
    db.query(sqlCourses, [ucid], (err, courseRows) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error retrieving courses');
        }

        const courseIds = courseRows.map(r => r.course_id);
        // If student has no courses, return empty list of books
        if (courseIds.length === 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify([]));
        }

        // 2) Fetch all books matching those course_ids
        // Build a placeholder string like "?, ?, ?"
        const placeholders = courseIds.map(_ => '?').join(', ');
        const sqlBooks = `
      SELECT
        book_id,
        name,
        author,
        price,
        course_id,
        cover_image
      FROM Book
     WHERE course_id IN (${placeholders})
    `;
        db.query(sqlBooks, courseIds, (err2, bookRows) => {
            if (err2) {
                res.statusCode = 500;
                return res.end('Error retrieving books');
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(bookRows));
        });
    });
};

const addOrder = (db, data, res) => {
    const { ucid, total_price, order_date } = data;
    if (!ucid || !total_price || !order_date) {
        res.statusCode = 400;
        return res.end('Missing required fields');
    }
    const sql = 'INSERT INTO orders (ucid, total_price, order_date) VALUES (?, ?, ?)';
    db.query(sql, [ucid, total_price, order_date], (err, result) => {
        if (err) {
            res.statusCode = 500;
            return res.end('Error inserting order');
        }
        res.statusCode = 201;
        res.end('Order inserted successfully');
    });
};


module.exports = { fetchBook, fetchEbook, fetchUser, fetchCourse, fetchTopBooks, fetchAllBooks, fetchRecBooks, addOrder };