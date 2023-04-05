import { body } from 'express-validator';
import Gender from '../enums/Gender.js';

export const buyTicketValidators = [
	body('seats')
		.isArray({
			min: 1,
			max: 5,
		})
		.withMessage(
			'Please provide an array of seats with a minimum of 1 and a maximum of 5'
		),
	body('seats.*.seat_number')
		.not()
		.isEmpty()
		.withMessage('Please provide a seat number'),
	body('seats.*.gender')
		.isIn([...Object.values(Gender)])
		.withMessage('Please provide a gender'),
	body('seats.*.name')
		.notEmpty()
		.withMessage('Please provide a name')
		.isString()
		.withMessage('Name must be a string'),
];
