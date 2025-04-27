// Custom Error class
class AppError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        // Ensure the prototype is correctly set for the Error object
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// Error handling middleware
function error(status: number, msg: string): AppError {
    return new AppError(status, msg);
}

export default error;
