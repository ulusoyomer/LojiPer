import CustomAPIError from './customApiErrors.js';
import { StatusCodes } from 'http-status-codes';

class BadRequestErrors extends CustomAPIError {
	constructor(message, errors) {
		super(message);
		this.errors = errors;
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequestErrors;
