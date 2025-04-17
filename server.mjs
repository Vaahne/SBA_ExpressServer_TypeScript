import express from 'express';
import bookRouter from  "./routers/bookRouter.mjs"

const app = express();
const PORT = 3000 || 3001;

app.use(express.json());

// middleware

// Routes

app.use('/lib/books',bookRouter);

app.get('/',(req,res)=>{
    res.send("Helloo");
});


// listener
app.listen(PORT,(req,res)=>{
    console.log(`Listening to the PORT: ${PORT}`);
});