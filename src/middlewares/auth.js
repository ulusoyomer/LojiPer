import { UnAuthenticatedErrors } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
	const token = req.cookies.lojiper_token;
	if (!token) {
		throw new UnAuthenticatedErrors('You are not authorized');
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: payload.userId };
	} catch (error) {
		throw new UnAuthenticatedErrors('You are not authorized');
	}
	next();
};

export default auth;
