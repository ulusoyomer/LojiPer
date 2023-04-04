import CustomAPIError from './customApiErrors.js';
import { StatusCodes } from 'http-status-codes';

class ResourceNotFoundErrors extends CustomAPIError {
	constructor(message, errors) {
		super(message);
		this.errors = errors;
		this.statusCode = StatusCodes.NOT_FOUND;
	}
}

export default ResourceNotFoundErrors;
