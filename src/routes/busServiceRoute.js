import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import { getAllBusServices } from '../controllers/busController.js';

const router = Router();

router.route('/:from').get(authMiddleware, getAllBusServices);
router.route('/:from/:to').get(authMiddleware, getAllBusServices);

export default router;
