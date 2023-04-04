import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Middlewares
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import notfoundMiddleWare from './middlewares/notFound.js';

// Database
import connectDB from './db/connectDB.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import busServiceRoutes from './routes/busServiceRoute.js';
import buyTicketRoutes from './routes/buyTicketRoute.js';
import profileRoutes from './routes/profileRoutes.js';

// App
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
app.use('/api/v1/buy', buyTicketRoutes);
app.use('/api/v1/profile', profileRoutes);

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
