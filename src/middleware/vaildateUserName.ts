import { Request,Response,NextFunction } from "express";
function validateUsername(req:Request,res:Response,next:NextFunction){
    const userName = req.body.userName;
    if(!userName || userName == "" || typeof userName != 'string'){
        res.send(400).json(`Invalid or empty username!! `);
    }
    next();
}

export default validateUsername;