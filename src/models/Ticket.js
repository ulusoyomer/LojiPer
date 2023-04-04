import mongoose from 'mongoose';
import Gender from '../utils/enums/Gender.js';

const TicketSchema = new mongoose.Schema({
	bus: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BusService',
		required: [true, 'Please provide a bus'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide a user'],
	},
	seats: {
		type: [
			{
				seat_number: {
					type: Number,
					required: [true, 'Please provide a seat number'],
				},
				name: {
					type: String,
					required: [true, 'Please provide a name'],
				},
				gender: {
					type: String,
					enum: [...Object.values(Gender), null],
					required: [true, 'Please provide a gender'],
				},
			},
		],
		required: [true, 'Please provide a seat'],
	},
});

export default mongoose.model('Ticket', TicketSchema);
