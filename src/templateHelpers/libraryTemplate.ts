import fs from 'fs';
import { Request,Response } from 'express';

type Options = {
    title: string;
    content: string;
    page: string;
};

type CallbackFunction = (err: Error | null, result?: string) => void;


function callBackFunc(filePath:string,options:Object,callBack:CallbackFunction):void{
    console.log(filePath,"File path");
    const option = options as {
        title: string;
        content: string;
        page: string;
      };



    fs.readFile(filePath,(err,content)=>{
        if(err) return callBack(err);

        let render = "";
        switch(option.page){
            case 'booksView':
            case 'usersView':
                        render = content.toString().replace("#title#",option.title).replace("#content#",option.content);
                         break;
            default:
                        render = content.toString().replace("#title#",option.title).replace("#content#",option.content);
        }
        return callBack(null,render);
    })
}
// to render library template
function library(req:Request,res:Response){
    let options = {
        title: "Library Management System",
        content: "Library Management System",
        page: "home"
    }
    res.render('libraryMain',options);
}

export default {callBackFunc,library};