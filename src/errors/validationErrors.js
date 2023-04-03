import CustomAPIError from './customApiErrors.js';
import { StatusCodes } from 'http-status-codes';

class ValidationErrors extends CustomAPIError {
	constructor(message, errors) {
		super('');
		this.errors = errors;
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export default ValidationErrors;
