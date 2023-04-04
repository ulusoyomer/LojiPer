import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../db/connectDB.js';
import User from '../models/User.js';
import BusService from '../models/BusService.js';

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		const users = JSON.parse(
			await readFile(
				new URL('./mock_data/MOCK_DATA_USER.json', import.meta.url)
			)
		);
		const buses = JSON.parse(
			await readFile(
				new URL('./mock_data/MOCK_DATA_BUS.json', import.meta.url)
			)
		);
		await User.deleteMany();
		await User.insertMany(users);
		await BusService.deleteMany();
		await BusService.insertMany(buses);
		console.log('Data imported');
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
