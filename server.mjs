import express from 'express';
import bookRouter from  "./routers/bookRouter.mjs";
import userRouter from  "./routers/userRouter.mjs";
import library from "./routers/libraryTemplateRouter.mjs";
import hateoas from "./hateoas/libraryHateoas.mjs";
import error from  "./utilities/error.mjs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000 || 3001;
const _filePath = fileURLToPath(import.meta.url);
const _dir = path.dirname(_filePath);


app.use(express.json());
app.use(express.static('public'));

// middleware
app.engine('library',(filePath,option,callBack)=>{
    fs.readFile(filePath,(err,content)=>{
        if(err) return callBack(err);

        let render = "";
        switch(option.page){
            case 'booksView':
            case 'usersView':
                        render = content.toString().replaceAll("#title#",option.title).replace("#content#",option.content);
                         break;
            default:
                        render = content.toString().replaceAll("#title#",option.title).replace("#content#",option.content);
        }
        return callBack(null,render);
    })
 });

app.set("views","./views");
app.set("view engine","library");

// Routes
app.use('/lib',library);
app.use('/lib/books',bookRouter);
app.use('/lib/users',userRouter);

// app.use('/lib')

// Basic Hateoas
app.get('/',hateoas.libraryHateoas);
app.get(/^\/lib\/book(?!s$).*/, hateoas.booksHateoas);
app.get(/^\/lib\/user(?!s$).*/,hateoas.userHateoas);


// using the view template http://localhost:3000/library
app.get('/library',(req,res)=>{
    // console.log("Testing ");
    // res.send("Sample one");
    let options = {
        title: "Library Management System",
        content: "Library Management System",
        page: "home"
    }
    res.render('libraryMain',options);
});

app.get('/lib/booksView',(req,res)=>{
    let options = {
        title: "Library Management System",
        content: "Library Management System",
        page: "home"
    }
    res.render('books',options);
});

// error handling middleware
app.use((req,res,next)=>{
    next(error(404,'Resource not found!!!'));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({error: err.message});
});

// listener
app.listen(PORT,(req,res)=>{
    console.log(`Listening to the PORT: ${PORT}`);
});