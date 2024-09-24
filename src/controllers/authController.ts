import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/authUtils';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export class AuthController {
    static async signup(req: Request, res: Response) {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        try {
            const existingUser = await prisma.user.findUnique({ where: { email } });

            if (existingUser) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            const hashedPassword = await hashPassword(password);
            const newUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            });

            res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser.id });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }

    static async signin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            const passwordMatch = await comparePasswords(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            const token = jwt.sign({
                userId: user.id
            }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login bem-sucedido', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    }
}
