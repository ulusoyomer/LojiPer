import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import { buyTicket } from '../controllers/buyTicketController.js';

const router = Router();

router.route('/:bus_id').post(authMiddleware, buyTicket);

export default router;
