import CustomAPIError from './customApiErrors.js';
import { StatusCodes } from 'http-status-codes';

class UnAuthenticatedErrors extends CustomAPIError {
	constructor(message, errors) {
		super(message);
		this.errors = errors;
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default UnAuthenticatedErrors;
