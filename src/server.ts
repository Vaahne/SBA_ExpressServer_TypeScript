import express, { Request,Response,NextFunction } from 'express';
import bookRouter from  "./routers/bookRouter";
import userRouter from  "./routers/userRouter";
import transactionRouter from "./routers/transactionRouter"
import library from "./routers/libraryTemplateRouter";
import hateoas from "./hateoas/libraryHateoas";
import error from  "./utilities/error";
import template from "./templateHelpers/libraryTemplate";

    const app = express();
    const PORT: number = 3000 ;


    app.use(express.json());
    app.use(express.static('public'));

    // middleware

    app.engine('library', template.callBackFunc);
    app.set("views","./views");
    app.set("view engine","library");

    // Routes
    app.use('/lib',library);
    app.use('/lib/books',bookRouter);
    app.use('/lib/users',userRouter);
    app.use('/lib/transactions',transactionRouter);


    // Basic Hateoas
    // app.get('/',(req:Request,res:Response) =>hateoas.libraryHateoas(req,res));
    


    // using the view template http://localhost:3000/library
    app.get('/library',template.library);


    // error handling middleware
    app.use((req,res,next)=>{
        next(error(404,'Resource not found!!!'));
    });

    app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
        // res.status(err.status || 500);
        res.json({error: err.message});
    });

    // listener
    app.listen(PORT,()=>{
        console.log(`Listening to the PORT: ${PORT}`);
    });