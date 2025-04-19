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

module.exports = {fetchBook, fetchEbook};