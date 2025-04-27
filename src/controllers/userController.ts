import users from '../data/users';
import { NextFunction, Request,Response } from 'express';

interface User{
    userId: number;
    userName: string;
}

// gets all users
function allUsers(req:Request,res:Response):void{
    const {userId} = req.query;
    // console.log("Hello ",userId);
    if(userId){
        const user = users.find((b:User)=> b.userId == Number(userId));
        if(user)
             res.status(200).json(user);
        else
            res.status(404).json(`User not found`);
        return;
    } 
    res.json(users);
}

// get a user by userid
function specificUser(req:Request,res:Response,next:NextFunction):void{
    const id = req.params.id;
    
    if(id){
        const user = users.find((b:User)=> b.userId == Number(id));
        if(user)
             res.status(200).json(user);
        else
             res.status(404).json(`User not found`);
        return;
    }
     res.json("User not Found !!")
     return;
}

// adds a user to the data
function addUser(req:Request,res:Response):void{
    if(req.body && req.body.userName){
        const id = users[users.length-1].userId + 1;
        const user = {userId : id, userName : req.body.userName};
        users.push(user);    
        res.status(201).json(user);
        return;
    }    
     res.json("User Not Found");   
     return;
}
// updates or patch a username
function updateUser(req:Request,res:Response):void{
    const userId = req.params.id;

    const user = users.find((b:User,i)=> {
         if(b.userId == Number(userId)){
           users[i].userName = req.body.userName;
           return true;
        }
    });

    if(user)
         res.status(200).json(user);
    else
        res.json(`User not found`);
    return;
}
// delete user by userid
function deleteUser(req:Request,res:Response):void{
    const userId = req.params.id;
    
    const index = users.findIndex(u => u.userId === Number(userId));

    if (index !== -1) {
        const user = users[index];
        users.splice(index, 1);
        res.status(200).json(user);
        return;
    }

     res.json("User Not Found");   
     return;
}
export default {addUser,allUsers,deleteUser,updateUser,specificUser};