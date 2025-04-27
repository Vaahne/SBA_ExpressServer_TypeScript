"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksTemplateController_1 = __importDefault(require("../controllers/booksTemplateController"));
const usersTemplateController_1 = __importDefault(require("../controllers/usersTemplateController"));
const router = express_1.default.Router();
router.get('/booksView', booksTemplateController_1.default.booksTemplate);
router.get('/usersView', usersTemplateController_1.default.userTemplate);
exports.default = router;
