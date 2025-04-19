function validateUsername(req,res,next){
    const userName = req.body.userName;
    if(!userName || userName == "" || typeof userName != 'string'){
        res.send(400).json(`Invalid or empty username!! `);
    }
}

export default validateUsername;