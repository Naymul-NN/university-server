import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appErrors";
import httpStatus from "http-status";
import Jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = () => {
    return catchAsync(

        async (req: Request , res: Response, next: NextFunction) => {

        const token = req.headers.authorization;
        // if the token is sent from the client

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
        }
        // check if the token is valid
      Jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
      if(err){
        throw new AppError(httpStatus.UNAUTHORIZED,'this is a wrong token ')
      }

       req.user = decoded as JwtPayload;
       next()

      })

        
    })
}



export default auth;