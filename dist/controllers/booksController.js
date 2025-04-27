"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../data/books"));
// returns all books or specific book based on query parameter
function allbooks(req, res) {
    const { bookId } = req.query; // using query parameter by bookId
    if (bookId) {
        const book = books_1.default.find((b) => b.bookId == Number(bookId));
        if (book)
            res.status(200).json(book);
        res.send(404).json(`Book not found!!!!`);
        return;
    }
    res.json(books_1.default);
    return;
}
// Returns/gets specific book based on bookId (:id)
function specificBook(req, res, next) {
    const id = req.params.id;
    if (id) {
        const book = books_1.default.find((b) => b.bookId == Number(id));
        if (book)
            res.status(200).json(book);
        return;
    }
    res.status(404).json("Book not Found in the library");
    return;
}
// adds a book to the books
function addBook(req, res) {
    if (req.body && req.body.title) {
        const id = books_1.default[books_1.default.length - 1].bookId + 1;
        const book = { bookId: id, title: req.body.title };
        books_1.default.push(book);
        res.status(201).json(book);
        return;
    }
    res.json(`Insufficient Data`);
    return;
}
// deletes a book based on the bookId
function deleteBook(req, res) {
    const bookId = req.params.id;
    const index = books_1.default.findIndex((b) => b.bookId === Number(bookId));
    if (index !== -1) {
        const deletedBook = books_1.default.splice(index, 1)[0];
        res.status(200).json(deletedBook);
        return;
    }
    res.status(404).json("Book Not Found");
    return;
}
//  updates a book title based in bookid
function updateBook(req, res) {
    const bookId = req.params.id;
    const book = books_1.default.find((b, i) => {
        if (b.bookId == Number(bookId)) {
            books_1.default[i].title = req.body.title;
            return true;
        }
    });
    if (book)
        res.status(200).json(book);
    res.json(`Book not found`);
    return;
}
exports.default = { addBook, allbooks, deleteBook, updateBook, specificBook };
