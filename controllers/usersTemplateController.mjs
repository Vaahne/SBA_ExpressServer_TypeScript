import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filePath = fileURLToPath(import.meta.url);
const _dir = path.dirname(_filePath);

// renders title , content to the users view template
function userTemplate(req,res){
    const formPath = path.join(process.cwd(),'views','formTemplate.library');
    let formContent = fs.readFileSync(formPath,'utf8');
    
    formContent = formContent.replaceAll("#type#","User");
    

    let options = {
        title: "Library Users",
        content: formContent,
        page: "users"
    }
    res.render("users",options);  //users.library view
}

export default {userTemplate};