import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res) => {
	const { INTERNAL_SERVER_ERROR } = StatusCodes;

	res.status(INTERNAL_SERVER_ERROR).json({
		error: err.message,
	});
};

export default errorHandlerMiddleware;
