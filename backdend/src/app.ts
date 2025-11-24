
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from './Routes/auth.routes';
import { employeeRouter } from './Routes/employee.routes';
import globalErrorHandler from './middleware/errorController';
import CustomError from './utils/AppError';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);

// 404
app.use((req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);

export default app;
