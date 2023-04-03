import User from '../models/User.js';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ValidationErrors, UnAuthenticatedErrors } from '../errors/index.js';

const login = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		throw new ValidationErrors('Validation failed', error.array());
	}

	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new UnAuthenticatedErrors('Invalid credentials');
	}

	const isPasswordValid = await user.comparePasswords(password);

	if (!isPasswordValid) {
		throw new UnAuthenticatedErrors('Invalid credentials');
	}

	const token = user.createJWT();
	user.password = undefined;

	res.status(StatusCodes.OK).json({ token, user });
};

const register = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		throw new ValidationErrors('Validation failed', error.array());
	}

	const { name, lastName, age, phone, email, password, gender } = req.body;
	const user = await User.create({
		name,
		lastName,
		age,
		phone,
		email,
		password,
		gender,
	});

	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({ token, user });
};

export { login, register };
