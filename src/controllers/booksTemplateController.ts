import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request,Response } from 'express';

interface Book{
    bookId: number;
    title: string;
};

// const _filePath = fileURLToPath(import.meta.url);
// const _dir = path.dirname(_filePath);
const _dir = path.dirname(__dirname);

//  renders the title , content to the books view template
function booksTemplate(req:Request,res:Response){
    const formPath = path.join(process.cwd(),'views','formTemplate.library');
    let formContent = fs.readFileSync(formPath,'utf8');

    formContent = formContent.split("#type#").join("Book");

    let options = {
        title: "Library Books",
        content: formContent,
        page: "books"
    }
    res.render("books",options); // books.library view
}
export default {booksTemplate};