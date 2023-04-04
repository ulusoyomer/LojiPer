import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
	const { INTERNAL_SERVER_ERROR } = StatusCodes;
	console.log(err);
	if (err.kind === 'ObjectId') {
		err.statusCode = StatusCodes.NOT_FOUND;
		err.message = 'Resource not found';
	}

	const errors = err.errors?.map((e) => e.msg);

	const errorMessage = errors ?? err.message;
	res.status(err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: errorMessage,
	});
};

export default errorHandlerMiddleware;
