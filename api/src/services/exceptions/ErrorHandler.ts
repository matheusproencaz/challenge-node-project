import { Request, Response, NextFunction } from "express";
import { CompanyAlreadyExistsError } from "./CompanyAlreadyExistsError";
import { ValidationError } from "./ValidationError";
import { CompanyDoesNotExistsError } from "./CompanyDoesNotExists";
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
    });
};

export default ErrorHandler;
