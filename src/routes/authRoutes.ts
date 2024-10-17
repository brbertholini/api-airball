import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/authController';
import authenticateToken from '../middlewares/authenticateToken';

interface User {
    id: string;
    email: string;
}

interface AuthenticatedRequest extends Request {
    user?: User;
}

const router = Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/signin', AuthController.signin);

router.get('/auth/protected', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: 'Acesso autorizado', user: req.user });
});

export default router;
