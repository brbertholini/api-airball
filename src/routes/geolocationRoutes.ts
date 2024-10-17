import { Router } from 'express';
import { getGeolocation } from '../controllers/geolocationController';
import authenticateToken from '../middlewares/authenticateToken';
import rateLimit from 'express-rate-limit';

const router = Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

router.get('/geolocation/:query', limiter, authenticateToken, getGeolocation);

export default router;
