"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// const _filePath = fileURLToPath(import.meta.url);
// const _dir = path.dirname(_filePath);
const _dir = path_1.default.dirname(__dirname);
// renders title , content to the users view template
function userTemplate(req, res) {
    const formPath = path_1.default.join(process.cwd(), 'views', 'formTemplate.library');
    let formContent = fs_1.default.readFileSync(formPath, 'utf8');
    formContent = formContent.split("#type#").join("User");
    let options = {
        title: "Library Users",
        content: formContent,
        page: "users"
    };
    res.render("users", options); //users.library view
}
exports.default = { userTemplate };
