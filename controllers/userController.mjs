import users from '../data/users.mjs';

function allUsers(req,res){
    res.json(users);
}

function specificUser(req,res,next){
    const userId = req.params.id;
    const {id} = req.query;
    
    const user = users.find((b)=> b.id == userId);
    if(user)
        return res.json(user);
    return res.json("User not Found !!")
}

function addUser(req,res){
    if(req.body && req.body.userName){
        const id = users[users.length-1].id + 1;
        const user = {id : id, userName : req.body.userName};
        users.push(user);    
        return res.json(user);
    }    
    return res.json("User Not Found");   
}

function updateUser(req,res){
    const userId = req.params.id;

    const user = users.find((b,i)=> {
         if(b.id == userId){
           users[i].userName = req.body.userName;
           return true;
        }
    });

    if(user)
        return res.json(user);
    return res.json(`User not found`);
}

function deleteUser(req,res){
    const userId = req.params.id;
    
    for(let u in users){
        if(users[u].id == userId){
            const user = users[u];
            users.splice(u,1);
            return res.json(user);
        }
    }
    return res.json("User Not Found");   
}
export default {addUser,allUsers,deleteUser,updateUser,specificUser};