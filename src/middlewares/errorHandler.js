import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	const { INTERNAL_SERVER_ERROR } = StatusCodes;

	const errors = err.errors?.map((e) => e.msg);

	const errorMessage = errors ?? err.message;
	res.status(err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: errorMessage,
	});
};

export default errorHandlerMiddleware;
