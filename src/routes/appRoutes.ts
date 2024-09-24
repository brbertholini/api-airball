import { Router, Request, Response } from 'express';
import { CourtController } from '../controllers/courtController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/courts/create', authenticateToken, async (req: Request, res: Response) => {
    try {
        await CourtController.createCourt(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao criar a quadra', error: error.message });
    }
});

export default router;
