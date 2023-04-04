import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import { getTickets, getTicket } from '../controllers/profileControllers.js';

const router = Router();

router.route('/tickets').get(authMiddleware, getTickets);
router.route('/tickets/:id').get(authMiddleware, getTicket);

export default router;
