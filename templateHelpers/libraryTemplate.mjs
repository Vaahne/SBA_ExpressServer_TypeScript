import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const _filePath = fileURLToPath(import.meta.url);
// const _dir = path.dirname(_filePath);

function callBackFunc(filePath,option,callBack){
    fs.readFile(filePath,(err,content)=>{
        if(err) return callBack(err);

        let render = "";
        switch(option.page){
            case 'booksView':
            case 'usersView':
                        render = content.toString().replaceAll("#title#",option.title).replace("#content#",option.content);
                         break;
            default:
                        render = content.toString().replaceAll("#title#",option.title).replace("#content#",option.content);
        }
        return callBack(null,render);
    })
}
// to render library template
function library(req,res){
    let options = {
        title: "Library Management System",
        content: "Library Management System",
        page: "home"
    }
    res.render('libraryMain',options);
}

export default {callBackFunc,library};