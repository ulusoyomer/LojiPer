import BusService from '../models/BusService.js';
import { StatusCodes } from 'http-status-codes';
import { ResourceNotFoundErrors, BadRequestErrors } from '../errors/index.js';

const getAllBusServices = async (req, res) => {
	const { from, to } = req.params;

	const queryObject = { from };
	if (to) queryObject.to = to.toLowerCase();

	const busServices = await BusService.find(queryObject)
		.sort({
			start_time: 1,
		})
		.select([
			'start_time',
			'end_time',
			'from',
			'to',
			'price',
			'company_name',
		]);
	if (!busServices) {
		throw new BadRequestErrors('Wrong trip from or to provided');
	}
	if (busServices.length === 0) {
		throw new ResourceNotFoundErrors('No bus services found');
	}
	res.status(StatusCodes.OK).json({ busServices });
};

const getTripScheduleInfo = async (req, res) => {
	const { from, id } = req.params;
	if (!id || !from) {
		throw new BadRequestErrors('No trip id provided');
	}
	const queryObject = { from, _id: id };
	const busService = await BusService.find(queryObject);
	if (!busService) {
		throw new BadRequestErrors('Wrong trip id or from provided');
	}
	if (busService.length === 0) {
		throw new ResourceNotFoundErrors('No bus services found');
	}
	res.status(StatusCodes.OK).json({ busService });
};

export { getAllBusServices, getTripScheduleInfo };
