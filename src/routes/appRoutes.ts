import { Router, Request, Response } from 'express';
import { CourtController } from '../controllers/courtController';
import authenticateToken from '../middlewares/authenticateToken';
import { MatchController } from '../controllers/matchController';
import { NewsController } from '../controllers/newsController';
import { CommentController } from '../controllers/commentController';

const router = Router();

router.post('/courts/create', authenticateToken, async (req: Request, res: Response) => {
    try {
        await CourtController.createCourt(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao criar a quadra', error: error.message });
    }
});

router.get('/courts/getAll', authenticateToken, async (req: Request, res: Response) => {
    try {
        await CourtController.getAllCourts(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar as quadras', error: error.message });
    }
});

router.get('/courts/getById/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        await CourtController.getCourtById(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar a quadra', error: error.message });
    }
});

router.post('/matches/create', authenticateToken, async(req: Request, res: Response) => {
    try {
        await MatchController.createMatch(req,res);
    } catch (error: any) {
        res.status(500).json({message: "Erro ao criar partida", error: error.message});
    }
})

router.post('/matches/addPlayer', authenticateToken, async (req: Request, res: Response) => {
    try {
        await MatchController.addPlayerToTeam(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao adicionar jogador ao time', error: error.message });
    }
});

router.get('/matches/getTeam/:matchId', authenticateToken, async(req: Request, res: Response) => {
    try {
        await MatchController.getTeamByMatchId(req,res);
    } catch (error: any) {
        res.status(500).json({message: "Erro ao buscar partidas", error: error.message});
    }
})

router.get('/matches', authenticateToken, async(req: Request, res: Response) => {
    try {
        await MatchController.getAllMatches(req,res);
    } catch (error: any) {
        res.status(500).json({message: "Erro ao buscar partidas", error: error.message});
    }
})

router.get('/matches/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        await MatchController.getMatchById(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar a partida', error: error.message });
    }
});

router.post('/news', authenticateToken, async (req: Request, res: Response) => {
    try {
        await NewsController.createNews(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao criar noticia', error: error.message });
    }
});

router.get('/news', authenticateToken, async (req: Request, res: Response) => {
    try {
        await NewsController.getAllNews(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar as noticias', error: error.message });
    }
});

router.get('/news/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        await NewsController.getNewById(req, res);
    } catch (error: any) {
        res.status(500).json({ message: 'Erro ao buscar a noticia', error: error.message });
    }
});

router.post('/courtComments', authenticateToken, async(req: Request, res: Response) => {
    try {
        await CommentController.createComment(req,res);
    } catch (error: any) {
        res.status(500).json({message: "Erro ao criar comentário", error: error.message});
    }
})

router.get('/courtComments', authenticateToken, async(req: Request, res: Response) => {
    try {
        await CommentController.getCommentsByCourtId(req,res);
    } catch (error: any) {
        res.status(500).json({message: "Erro ao buscar comentários", error: error.message});
    }
})

export default router;