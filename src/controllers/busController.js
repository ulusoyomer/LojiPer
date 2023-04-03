import BusService from '../models/BusService.js';
import { StatusCodes } from 'http-status-codes';

const getAllBusServices = async (req, res) => {
	const { from, to } = req.params;

	const queryObject = { from: from.toLowerCase() };
	if (to) queryObject.to = to.toLowerCase();
	console.log(queryObject);

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
	res.status(StatusCodes.OK).json({ busServices });
};

export { getAllBusServices };
