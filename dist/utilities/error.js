"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom Error class
class AppError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        // Ensure the prototype is correctly set for the Error object
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
// Error handling middleware
function error(status, msg) {
    return new AppError(status, msg);
}
exports.default = error;
