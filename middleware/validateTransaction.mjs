function validateType(req,res,next){
    const type = req.body.type;
    if(!type || !["borrow","return"].includes(type))
        return res.status(400).json("Invalid type!!! Can be either borrow or return!!!");
    next();
}
export default validateType;