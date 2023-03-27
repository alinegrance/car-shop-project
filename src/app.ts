import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRouter from './Routes/carRoutes';
import motorcycleRouter from './Routes/motorcycleRoutes';

const app = express();

app.use(express.json());

app.use('/cars', carRouter);

app.use('/motorcycles', motorcycleRouter);

app.use(ErrorHandler.handle);

export default app;
