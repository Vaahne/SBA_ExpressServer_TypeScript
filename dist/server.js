"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter_1 = __importDefault(require("./routers/bookRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const transactionRouter_1 = __importDefault(require("./routers/transactionRouter"));
const libraryTemplateRouter_1 = __importDefault(require("./routers/libraryTemplateRouter"));
const error_1 = __importDefault(require("./utilities/error"));
const libraryTemplate_1 = __importDefault(require("./templateHelpers/libraryTemplate"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// middleware
app.engine('library', libraryTemplate_1.default.callBackFunc);
app.set("views", "./views");
app.set("view engine", "library");
// Routes
app.use('/lib', libraryTemplateRouter_1.default);
app.use('/lib/books', bookRouter_1.default);
app.use('/lib/users', userRouter_1.default);
app.use('/lib/transactions', transactionRouter_1.default);
// Basic Hateoas
// app.get('/',(req:Request,res:Response) =>hateoas.libraryHateoas(req,res));
// using the view template http://localhost:3000/library
app.get('/library', libraryTemplate_1.default.library);
// error handling middleware
app.use((req, res, next) => {
    next((0, error_1.default)(404, 'Resource not found!!!'));
});
app.use((err, req, res, next) => {
    // res.status(err.status || 500);
    res.json({ error: err.message });
});
// listener
app.listen(PORT, () => {
    console.log(`Listening to the PORT: ${PORT}`);
});
