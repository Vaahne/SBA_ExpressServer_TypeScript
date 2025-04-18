import books from '../data/books.mjs';

function allbooks(req,res){
    return res.json(books);
}

function specificBook(req,res,next){
    const bookId = req.params.id;
    const {id}  = req.query;
    if(bookId){
        const book = books.find((b)=> b.id == bookId);
        if(book)
            return res.json(book);
    }
    if(id){
        const book = books.find((b)=> b.id == id);
        if(book)
            return res.json(book);
    }
    return res.json("Book not Found in the library");
}

function addBook(req,res){
    if(req.body && req.body.title){
        const id = books[books.length-1].id + 1;
        const book = {id : id, title : req.body.title};
        books.push(book);
        return res.json(book);
    }
    return res.json(`Insufficient Data`);
}

function deleteBook(req,res){
    
    const bookId = req.params.id;
    
    for(let b in books){
        if(books[b].id == bookId){
            const book = books[b];
            books.splice(b,1);
            return res.json(book);
        }
    }
    return res.json("Book Not Found");   
}

function updateBook(req,res){
    const bookId = req.params.id;

    const book = books.find((b,i)=> {
         if(b.id == bookId){
           books[i].title = req.body.title;
           return true;
        }
    });
    if(book)
        return res.json(book);
    return res.json(`Book not found`);
}

export default {addBook,allbooks,deleteBook,updateBook,specificBook};