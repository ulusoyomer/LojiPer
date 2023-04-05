import User from '../models/User.js';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { ValidationErrors, UnAuthenticatedErrors } from '../errors/index.js';
import setCookies from '../utils/setCookie.js';

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

	setCookies(res, token);
	res.status(StatusCodes.OK).json({ user });
};

const register = async (req, res) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		throw new ValidationErrors('Validation failed', error.array());
	}

	const { name, lastName, age, phone, email, password, gender } = req.body;
	const temp = await User.findOne({ email });
	if (temp) {
		throw new ValidationErrors('Email already exists');
	}
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
	setCookies(res, token);
	user.password = undefined;
	res.status(StatusCodes.CREATED).json({ user });
};

export { login, register };
