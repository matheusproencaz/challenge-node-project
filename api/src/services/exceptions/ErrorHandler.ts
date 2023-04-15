import { Request, Response, NextFunction } from "express";
import { ValidationError } from "./ValidationError";
import { BaseAppError } from "./BaseAppError";

const ErrorHandler = (err, req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware Error Handling");
    
    let errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    if (err instanceof BaseAppError) {
         errStatus = 400;
    }

    if (err instanceof ValidationError) {
        res.status(errStatus).json({
            success: false,
            status: errStatus,
            message: errMsg,
            erros: err.validationErrors
        });
    }
    
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development'
    });
};

export default ErrorHandler;
