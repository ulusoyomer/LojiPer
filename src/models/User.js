import mongoose from 'mongoose';
import Gender from '../utils/enums/Gender.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		minlenght: [3, 'Name must be at least 3 characters'],
		maxlenght: [20, 'Name must be less than 20 characters'],
		trim: true,
	},
	lastName: {
		type: String,
		default: '',
		maxlenght: [20, 'Last name must be less than 20 characters'],
	},
	age: {
		type: Number,
		default: 0,
		min: [0, 'Age must be greater than 0'],
		max: [100, 'Age must be less than 100'],
	},
	phone: {
		type: String,
		default: '',
		maxlenght: [20, 'Phone must be less than 20 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	gender: {
		type: String,
		enum: [...Object.values(Gender)],
	},
});

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

export default mongoose.model('User', UserSchema);
