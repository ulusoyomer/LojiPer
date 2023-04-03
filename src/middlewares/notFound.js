import { StatusCodes } from 'http-status-codes';

const notfoundMiddleWare = (req, res, next) =>
	res.status(StatusCodes.NOT_FOUND).send('Route not found');

export default notfoundMiddleWare;
