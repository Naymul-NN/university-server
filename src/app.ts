/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorhandler from './app/middleware/globalErrorhandler';
import notFoundRoute from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsar
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173', credentials: true}));


// application routes

app.use('/api/v1', router);


const getAController =  (req: Request, res: Response) => {
  res.send("i love you allah");
}

app.get('/', getAController);

// error handle 
app.use(globalErrorhandler)
// NOT FOUND
app.use(notFoundRoute);
export default app;
