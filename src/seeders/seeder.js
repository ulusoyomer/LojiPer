import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../db/connectDB.js';
import User from '../models/User.js';
import BusService from '../models/BusService.js';
import Ticket from '../models/Ticket.js';

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
		const tickets = JSON.parse(
			await readFile(
				new URL('./mock_data/MOCK_DATA_TICKET.json', import.meta.url)
			)
		);
		await User.deleteMany();
		await User.insertMany(users);
		await BusService.deleteMany();
		await BusService.insertMany(buses);
		await Ticket.deleteMany();
		await Ticket.insertMany(tickets);
		console.log('Data imported');
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
