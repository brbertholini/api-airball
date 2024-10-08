import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourtController {
    static async createCourt(req: Request, res: Response) {
        const { name, location, type, image, lighting_quality, hoop_quality, usage_frequency } = req.body;

        if (!name || !location || !type || typeof lighting_quality !== 'number' || typeof hoop_quality !== 'number' || typeof usage_frequency !== 'number') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e devem ser preenchidos corretamente' });
        }

        try {
            const existingCourt = await prisma.court.findFirst({ where: { name } });
            if (existingCourt) {
                return res.status(400).json({ error: 'Quadra já cadastrada com este nome' });
            }

            const newCourt = await prisma.court.create({
                data: {
                    name,
                    location,
                    type,
                    image,
                    lighting_quality,
                    hoop_quality,
                    usage_frequency,
                },
            });

            res.status(201).json({ message: 'Quadra criada com sucesso', court: newCourt });
        } catch (error) {
            console.error('Erro na criação da Quadra:', error);
            res.status(500).json({ error: 'Erro ao criar quadra' });
        }
    }

    static async getAllCourts(req: Request, res: Response) {
        try {
            const courts = await prisma.court.findMany();
            res.status(200).json(courts);
        } catch (error) {
            console.error('Erro ao buscar todas as quadras:', error);
            res.status(500).json({ error: 'Erro ao buscar quadras' });
        }
    }

    static async getCourtById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const court = await prisma.court.findUnique({
                where: { id: Number(id) }
            });

            if (!court) {
                return res.status(404).json({ error: 'Quadra não encontrada' });
            }

            res.status(200).json(court);
        } catch (error) {
            console.error('Erro ao buscar quadra específica:', error);
            res.status(500).json({ error: 'Erro ao buscar quadra' });
        }
    }
}