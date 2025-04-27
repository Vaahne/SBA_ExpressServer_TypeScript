import books from '../data/books';
import {NextFunction, Request,Response} from 'express';

interface Book{
 bookId: number;
 title: string;
}
// returns all books or specific book based on query parameter
function allbooks(req : Request,res:Response):void  {
    const {bookId} = req.query; // using query parameter by bookId

    if(bookId){
        const book = books.find((b: Book) => b.bookId == Number(bookId));
        if(book)
             res.status(200).json(book);
         res.send(404).json(`Book not found!!!!`);
        return;
    } 

    res.json(books);
    return;
}
// Returns/gets specific book based on bookId (:id)
function specificBook(req:Request,res:Response,next:NextFunction):void {
    const id = req.params.id;
    
    if(id){
        const book = books.find((b:Book)=> b.bookId == Number(id));
        if(book)
             res.status(200).json(book);
        return;
    }
    res.status(404).json("Book not Found in the library");
    return
}
// adds a book to the books
function addBook(req:Request,res:Response):void {
    if(req.body && req.body.title){
        const id = books[books.length-1].bookId + 1;
        const book = {bookId : id, title : req.body.title};
        books.push(book);
        res.status(201).json(book);
        return;
    }
    res.json(`Insufficient Data`);
    return;
}
// deletes a book based on the bookId
function deleteBook(req:Request,res:Response):void {
    const bookId = req.params.id;
    
    const index = books.findIndex((b: Book) => b.bookId === Number(bookId));
    if (index !== -1) {
      const deletedBook = books.splice(index, 1)[0];
       res.status(200).json(deletedBook);
       return;
    }
    res.status(404).json("Book Not Found");
    return;
}
//  updates a book title based in bookid
function updateBook(req:Request,res:Response):void {
    const bookId = req.params.id;

    const book = books.find((b: Book,i)=> {
         if(b.bookId == Number(bookId)){
           books[i].title = req.body.title;
           return true;
        }
    });
    if(book)
         res.status(200).json(book);
    res.json(`Book not found`);
    return;
}

export default {addBook,allbooks,deleteBook,updateBook,specificBook};