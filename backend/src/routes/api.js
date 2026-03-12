import express from 'express';
import { checkout, getStrategies } from '../controllers/checkoutController.js';

const router = express.Router();
router.post('/checkout', checkout);
router.get('/checkout/strategies', getStrategies);
router.get('/health', (req, res) => res.json({ status: 'ok' }));

export default router;