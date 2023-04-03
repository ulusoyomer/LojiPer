import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login } from '../controllers/authController.js';
import {
	registerValidator,
	loginValidator,
} from '../utils/validators/authValidator.js';

const router = Router();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10,
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/register').post(apiLimiter, registerValidator, register);
router.route('/login').post(apiLimiter, loginValidator, login);

export default router;
