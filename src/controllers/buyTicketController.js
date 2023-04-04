import { StatusCodes } from 'http-status-codes';
import Ticket from '../models/Ticket.js';
import BusService from '../models/BusService.js';
import { BadRequestErrors } from '../errors/index.js';

export const buyTicket = async (req, res) => {
	const { bus_id } = req.params;
	const { seats } = req.body;
	if (!bus_id && !seats) {
		throw new BadRequestErrors('No bus id or seat number provided');
	}
	if (!(seats instanceof Array)) {
		throw new BadRequestErrors('Seats must be an array');
	}
	if (seats.length === 0) {
		throw new BadRequestErrors('No seat provided');
	}
	if (seats.length > 5) {
		throw new BadRequestErrors('You can only buy 5 tickets at a time');
	}

	seats.forEach((seat) => {
		const result = seats.filter((s) => s.seat_number === seat.seat_number);
		if (result.length > 1) {
			throw new BadRequestErrors('You cannot buy the same seat twice');
		}
	});

	const busService = await BusService.findById(bus_id).select([
		'seats',
		'total_seats',
	]);

	if (!busService) {
		throw new BadRequestErrors('Wrong bus id provided');
	}

	if (busService.seats.length + seats.length > busService.total_seats) {
		throw new BadRequestErrors('No more seats available');
	}

	seats.forEach((seat) => {
		const tempNumber =
			seat.seat_number % 2 === 0
				? seat.seat_number - 1
				: seat.seat_number + 1;

		busService.seats.map((s) => {
			if (tempNumber === s.seat_number) {
				if (seat.gender !== s.gender) {
					throw new BadRequestErrors('Seat gender not acceptable');
				}
			}
			if (s.seat_number == seat.seat_number) {
				throw new BadRequestErrors('Seat already taken');
			}
		});
	});

	console.log(req.userId);
	const ticket = await Ticket.create({
		bus: bus_id,
		user: req.user.userId,
		seats,
	});

	busService.seats = [...busService.seats, ...seats];
	await busService.save();

	res.status(StatusCodes.CREATED).json({
		message: 'Ticket bought successfully',
		data: ticket,
	});
};
