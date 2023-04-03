import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	const { INTERNAL_SERVER_ERROR } = StatusCodes;

	const errors = err.errors.map((e) => e.msg);

	const errorMessage = errors ?? 'Internal Server Error';
	res.status(err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
		error: errorMessage,
	});
};

export default errorHandlerMiddleware;
