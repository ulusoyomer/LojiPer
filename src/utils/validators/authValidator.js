import { body } from 'express-validator';
import Gender from '../enums/Gender.js';

export const registerValidator = [
	body('name')
		.not()
		.isEmpty()
		.withMessage('Please provide a name')
		.isLength({ min: 3, max: 20 })
		.withMessage('Name must be between 3 and 20 characters'),
	body('lastName')
		.not()
		.isEmpty()
		.withMessage('Please provide a last name')
		.isLength({ min: 3, max: 20 })
		.withMessage('Last name must be between 3 and 20 characters'),
	body('age')
		.not()
		.isEmpty()
		.withMessage('Please provide an age')
		.isInt({ min: 0, max: 100 })
		.withMessage('Age must be between 0 and 100'),
	body('phone')
		.not()
		.isEmpty()
		.withMessage('Please provide a phone')
		.isLength({ min: 3, max: 20 })
		.withMessage('Phone must be between 3 and 20 characters'),
	body('email')
		.not()
		.isEmpty()
		.withMessage('Please provide an email')
		.isEmail()
		.withMessage('Please provide a valid email'),
	body('password')
		.not()
		.isEmpty()
		.withMessage('Please provide a password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters'),

	body('passwordConfirmation').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}
		return true;
	}),

	body('gender').not().isEmpty().isIn(Object.values(Gender)),
];
