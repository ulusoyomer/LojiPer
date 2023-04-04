import BusService from '../models/BusService.js';
import { StatusCodes } from 'http-status-codes';

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
		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'No bus services found',
		});
	}
	if (busServices.length === 0) {
		return res.status(StatusCodes.NOT_FOUND).json({
			success: true,
			message: 'No bus services found',
		});
	}
	res.status(StatusCodes.OK).json({ busServices });
};

const getTripScheduleInfo = async (req, res) => {
	const { from, id } = req.params;
	if (!id || !from) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			success: false,
			message: 'No trip id provided',
		});
	}
	const queryObject = { from, _id: id };
	const busService = await BusService.find(queryObject).populate(
		'seats.user',
		'gender'
	);
	if (!busService) {
		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			message: 'No bus service found',
		});
	}
	if (busServices.length === 0) {
		return res.status(StatusCodes.NOT_FOUND).json({
			success: true,
			message: 'No bus services found',
		});
	}
	res.status(StatusCodes.OK).json({ busService });
};

export { getAllBusServices, getTripScheduleInfo };
