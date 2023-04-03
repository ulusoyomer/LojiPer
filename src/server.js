import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import errorHandlerMiddleware from './middlewares/errorHandler.js';
import notfoundMiddleWare from './middlewares/notFound.js';

import connectDB from './db/connectDB.js';

import authRoutes from './routes/authRoutes.js';
import busServiceRoutes from './routes/busServiceRoute.js';

const app = express();
dotenv.config();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(cookieParser());

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Lojiper API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/buses', busServiceRoutes);

app.use(notfoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(
				`Server is running on port ${port} in ${process.env.NODE_ENV} mode`
			);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
