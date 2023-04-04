import Ticket from '../models/Ticket.js';
import { StatusCodes } from 'http-status-codes';
import { ResourceNotFoundErrors } from '../errors/index.js';

export const getTickets = async (req, res) => {
	const tickets = await Ticket.find({ user: req.user.userId })
		.populate('bus', ['from', 'to', 'company_name'])
		.sort({ createdAt: -1 })
		.select('createdAt');
	if (!tickets) {
		throw new ResourceNotFoundErrors('No ticket found');
	}
	res.status(StatusCodes.OK).json({ tickets });
};

export const getTicket = async (req, res) => {
	const { id } = req.params;
	const ticket = await Ticket.findOne({
		user: req.user.userId,
		_id: id,
	}).populate('bus', ['from', 'to', 'company_name', 'total_seats']);
	if (!ticket) {
		throw new ResourceNotFoundErrors('No ticket found');
	}
	res.status(StatusCodes.OK).json({
		seats: ticket.seats,
		bus: ticket.bus,
	});
};
