import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filePath = fileURLToPath(import.meta.url);
const _dir = path.dirname(_filePath);

//  renders the title , content to the books view template
function booksTemplate(req,res){
    const formPath = path.join(process.cwd(),'views','formTemplate.library');
    let formContent = fs.readFileSync(formPath,'utf8');

    formContent = formContent.replaceAll("#type#","Book");

    let options = {
        title: "Library Books",
        content: formContent,
        page: "books"
    }
    res.render("books",options); // books.library view
}
export default {booksTemplate};