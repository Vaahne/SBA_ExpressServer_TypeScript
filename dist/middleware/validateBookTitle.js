"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateTitle(req, res, next) {
    const title = req.body.title;
    // Check if title is missing, empty, or not a string
    if (!title || typeof title !== 'string' || title.trim() === "") {
        res.status(400).json({ message: "Invalid or empty Book title!!!" }); // Return response directly
        return;
    }
    // If title is valid, proceed to the next middleware/route handler
    next();
}
exports.default = validateTitle;
