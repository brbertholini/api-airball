import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MatchController {
    static async createMatch(req: Request, res: Response) {
        const { date, status, courtId, teamAPlayers, teamBPlayers } = req.body;

        if (!date || !courtId) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios e devem ser preenchidos corretamente' });
        }

        try {
            const players = await prisma.user.findMany({
                where: {
                    id: {
                        in: [...teamAPlayers, ...teamBPlayers]
                    }
                }
            });

            if (players.length !== teamAPlayers.length + teamBPlayers.length) {
                return res.status(400).json({ error: 'Um ou mais IDs de jogador são inválidos' });
            }

            const newMatch = await prisma.match.create({
                data: {
                    date: new Date(date),
                    status: status || "scheduled",
                    court: { connect: { id: courtId } },
                    teams: {
                        create: [
                            {
                                isTeamA: true,
                                players: {
                                    create: teamAPlayers.map((playerId: number) => ({
                                        player: { connect: { id: playerId } }
                                    }))
                                }
                            },
                            {
                                isTeamA: false,
                                players: {
                                    create: teamBPlayers.map((playerId: number) => ({
                                        player: { connect: { id: playerId } }
                                    }))
                                }
                            }
                        ]
                    }
                }
            });

            res.status(201).json({ message: 'Partida criada com sucesso', match: newMatch });
        } catch (error) {
            console.error('Erro na criação da Partida:', error);
            res.status(500).json({ error: 'Erro ao criar Partida' });
        }
    }

    static async getAllMatches(req: Request, res: Response) {
        try {
            const matches = await prisma.match.findMany({
                include: {
                    court: true,
                    teams: {
                        include: {
                            players: {
                                include: {
                                    player: true
                                }
                            }
                        }
                    }
                }
            });

            res.status(200).json(matches);
        } catch (error) {
            console.error('Erro ao listar partidas:', error);
            res.status(500).json({ error: 'Erro ao listar partidas' });
        }
    }

    static async getMatchById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const match = await prisma.match.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    court: true,
                    teams: {
                        include: {
                            players: {
                                include: {
                                    player: true
                                }
                            }
                        }
                    }
                }
            });

            if (!match) {
                return res.status(404).json({ error: 'Partida não encontrada' });
            }

            res.status(200).json(match);
        } catch (error) {
            console.error('Erro ao obter partida:', error);
            res.status(500).json({ error: 'Erro ao obter partida' });
        }
    }
}
