"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
;
// const _filePath = fileURLToPath(import.meta.url);
// const _dir = path.dirname(_filePath);
const _dir = path_1.default.dirname(__dirname);
//  renders the title , content to the books view template
function booksTemplate(req, res) {
    const formPath = path_1.default.join(process.cwd(), 'views', 'formTemplate.library');
    let formContent = fs_1.default.readFileSync(formPath, 'utf8');
    formContent = formContent.split("#type#").join("Book");
    let options = {
        title: "Library Books",
        content: formContent,
        page: "books"
    };
    res.render("books", options); // books.library view
}
exports.default = { booksTemplate };
