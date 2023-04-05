import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import { buyTicket } from '../controllers/buyTicketController.js';
import { buyTicketValidators } from '../utils/validators/buyTicketValidators.js';

const router = Router();

router.route('/:bus_id').post(authMiddleware, buyTicketValidators, buyTicket);

export default router;
