"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateUsername(req, res, next) {
    const userName = req.body.userName;
    if (!userName || userName == "" || typeof userName != 'string') {
        res.send(400).json(`Invalid or empty username!! `);
    }
    next();
}
exports.default = validateUsername;
