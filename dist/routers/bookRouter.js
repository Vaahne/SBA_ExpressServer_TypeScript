"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {body,validationResult} from 'express-validator';
const booksController_1 = __importDefault(require("../controllers/booksController"));
const validateBookTitle_1 = __importDefault(require("../middleware/validateBookTitle"));
const router = express_1.default.Router();
router.route('/').get(booksController_1.default.allbooks)
    .post(validateBookTitle_1.default, booksController_1.default.addBook);
router.route('/:id').get(booksController_1.default.specificBook)
    .patch(booksController_1.default.updateBook)
    .delete(booksController_1.default.deleteBook);
exports.default = router;
