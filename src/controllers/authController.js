import User from '../models/User.js';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import ValidationErrors from '../errors/validationErrors.js';

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json({ message: 'Please provide email and password' });
	}

	res.status(200).json({ message: 'Login successful' });
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
