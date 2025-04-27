import { Request,Response,NextFunction } from "express";
function validateType(req:Request,res:Response,next:NextFunction):void{
    const type = req.body.type;
    if(!type || !["borrow","return"].includes(type)){
         res.status(400).json("Invalid type!!! Can be either borrow or return!!!");
        return;
    }
    next();
}
export default validateType;