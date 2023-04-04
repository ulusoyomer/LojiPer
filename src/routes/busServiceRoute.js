import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import {
	getAllBusServices,
	getTripScheduleInfo,
} from '../controllers/busController.js';

const router = Router();

router.route('/:from').get(authMiddleware, getAllBusServices);
router.route('/:from/:to').get(authMiddleware, getAllBusServices);
router.route('/:from/schedule/:id').get(authMiddleware, getTripScheduleInfo);

export default router;
