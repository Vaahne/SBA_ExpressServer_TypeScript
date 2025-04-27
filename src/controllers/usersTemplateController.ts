import { Request,Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


interface Transaction{
    transaction_id : number;
    userId: number;
    bookId: number;
    type: string;
}

// const _filePath = fileURLToPath(import.meta.url);
// const _dir = path.dirname(_filePath);
const _dir = path.dirname(__dirname);

// renders title , content to the users view template
function userTemplate(req:Request,res:Response){
    const formPath = path.join(process.cwd(),'views','formTemplate.library');
    let formContent = fs.readFileSync(formPath,'utf8');
    
    formContent = formContent.split("#type#").join("User");

    let options = {
        title: "Library Users",
        content: formContent,
        page: "users"
    }
    res.render("users",options);  //users.library view
}

export default {userTemplate};