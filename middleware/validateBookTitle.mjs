function validateTitle(req,res,next){
    const title = req.body.title;
    if(!title || typeof title != 'string' || title == ""){
        return res.status(400).json("Invalid or empty Book title!!!");
    }
    next();
}

export default validateTitle;