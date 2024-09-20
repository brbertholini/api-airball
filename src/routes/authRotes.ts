import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);

export default router;
