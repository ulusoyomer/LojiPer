import mongoose from 'mongoose';
import Gender from '../utils/enums/Gender.js';

const BusServiceSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	company_name: {
		type: String,
		required: [true, 'Please provide a company name'],
	},
	price: {
		type: Number,
		min: [0, 'Price must be greater than 0'],
	},
	start_time: {
		type: String,
		required: [true, 'Please provide a start time'],
	},
	end_time: {
		type: String,
		required: [true, 'Please provide a end time'],
	},
	from: {
		type: String,
		required: [true, 'Please provide a from'],
	},
	to: {
		type: String,
		required: [true, 'Please provide a to'],
	},
	total_seats: {
		type: Number,
	},
	seats: {
		type: [
			{
				name: {
					type: String,
					required: [true, 'Please provide a name'],
				},
				gender: {
					type: String,
					enum: [...Object.values(Gender)],
					required: [true, 'Please provide a gender'],
				},
				seat_number: {
					type: Number,
					required: [true, 'Please provide a seat number'],
				},
			},
		],
		default: [],
	},
});

export default mongoose.model('BusService', BusServiceSchema);
