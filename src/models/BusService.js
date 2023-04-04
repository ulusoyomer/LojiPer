import mongoose from 'mongoose';

const BusServiceSchema = new mongoose.Schema({
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
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				seat_number: Number,
			},
		],
	},
});

export default mongoose.model('BusService', BusServiceSchema);
