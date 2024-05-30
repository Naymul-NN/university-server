
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFoundRoute = (err: any, req: Request, res: Response,next: NextFunction)=>{
    
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Api not found',
      error: ''
    })
    };

    export default notFoundRoute ;