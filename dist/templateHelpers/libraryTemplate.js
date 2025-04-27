"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function callBackFunc(filePath, options, callBack) {
    console.log(filePath, "File path");
    const option = options;
    fs_1.default.readFile(filePath, (err, content) => {
        if (err)
            return callBack(err);
        let render = "";
        switch (option.page) {
            case 'booksView':
            case 'usersView':
                render = content.toString().replace("#title#", option.title).replace("#content#", option.content);
                break;
            default:
                render = content.toString().replace("#title#", option.title).replace("#content#", option.content);
        }
        return callBack(null, render);
    });
}
// to render library template
function library(req, res) {
    let options = {
        title: "Library Management System",
        content: "Library Management System",
        page: "home"
    };
    res.render('libraryMain', options);
}
exports.default = { callBackFunc, library };
