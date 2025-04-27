"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateType(req, res, next) {
    const type = req.body.type;
    if (!type || !["borrow", "return"].includes(type)) {
        res.status(400).json("Invalid type!!! Can be either borrow or return!!!");
        return;
    }
    next();
}
exports.default = validateType;
