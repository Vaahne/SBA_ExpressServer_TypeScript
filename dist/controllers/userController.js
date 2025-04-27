"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../data/users"));
// gets all users
function allUsers(req, res) {
    const { userId } = req.query;
    // console.log("Hello ",userId);
    if (userId) {
        const user = users_1.default.find((b) => b.userId == Number(userId));
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json(`User not found`);
        return;
    }
    res.json(users_1.default);
}
// get a user by userid
function specificUser(req, res, next) {
    const id = req.params.id;
    if (id) {
        const user = users_1.default.find((b) => b.userId == Number(id));
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json(`User not found`);
        return;
    }
    res.json("User not Found !!");
    return;
}
// adds a user to the data
function addUser(req, res) {
    if (req.body && req.body.userName) {
        const id = users_1.default[users_1.default.length - 1].userId + 1;
        const user = { userId: id, userName: req.body.userName };
        users_1.default.push(user);
        res.status(201).json(user);
        return;
    }
    res.json("User Not Found");
    return;
}
// updates or patch a username
function updateUser(req, res) {
    const userId = req.params.id;
    const user = users_1.default.find((b, i) => {
        if (b.userId == Number(userId)) {
            users_1.default[i].userName = req.body.userName;
            return true;
        }
    });
    if (user)
        res.status(200).json(user);
    else
        res.json(`User not found`);
    return;
}
// delete user by userid
function deleteUser(req, res) {
    const userId = req.params.id;
    const index = users_1.default.findIndex(u => u.userId === Number(userId));
    if (index !== -1) {
        const user = users_1.default[index];
        users_1.default.splice(index, 1);
        res.status(200).json(user);
        return;
    }
    res.json("User Not Found");
    return;
}
exports.default = { addUser, allUsers, deleteUser, updateUser, specificUser };
