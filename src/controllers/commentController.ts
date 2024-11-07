import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CommentController {
    static async createComment(req: Request, res: Response) {
        const { comment, userId, courtId } = req.body;

        try {
            const newComment = await prisma.courtComment.create({
                data: {
                    comment: comment,
                    court: { connect: { id: courtId } },
                    user: { connect: { id: userId } }
                }
            });

            res.status(201).json({ message: 'Comentário criado com sucesso', comment: newComment });
        } catch (error) {
            console.error('Erro na criação do comentário:', error);
            res.status(500).json({ error: 'Erro ao criar comentário' });
        }
    }

    static async getCommentsByCourtId(req: Request, res: Response) {
        const { courtId } = req.body
        console.log('req', req)
        console.log('courtId', courtId)
        
        try {
            const comments = await prisma.courtComment.findMany({
                where: { id: Number(courtId) }
            });
            res.status(200).json(comments);
        } catch (error) {
            console.error('Erro ao buscar os comentários:', error);
            res.status(500).json({ error: 'Erro ao buscar comentários' });
        }
    }
}