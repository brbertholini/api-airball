import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class NewsController {
  static async createNews(req: Request, res: Response) {
    const { title, content, posted_at, image, source } = req.body;

    if (!title || !content || !source) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios (title, content, source) devem ser preenchidos.' });
    }

    const createdAt = posted_at ? new Date(posted_at) : new Date();

    try {
      const newNew = await prisma.new.create({
        data: {
          title,
          content,
          posted_at: createdAt,     
          image: image ? Buffer.from(image, 'base64') : null,  
          source,
        },
      });

      return res.status(201).json({ message: 'Notícia criada com sucesso!', news: newNew });
    } catch (error) {
      console.error('Erro na criação da notícia:', error);
      return res.status(500).json({ error: 'Erro ao criar notícia' });
    }
  }

  static async getAllNews(req: Request, res: Response) {
    try {
        const news = await prisma.new.findMany();
        res.status(200).json(news);
    } catch (error) {
        console.error('Erro ao buscar todas as Noticias:', error);
        res.status(500).json({ error: 'Erro ao buscar noticias' });
    }
  }

  static async getNewById(req: Request, res: Response) {
    const id = req.params.id;
    
        try {
            const noticia = await prisma.new.findUnique({
                where: { id: Number(id) }
            });
    
            if (!noticia) {
                return res.status(404).json({ error: 'Noticia não encontrada' });
            }
    
            res.status(200).json(noticia);
        } catch (error) {
            console.error('Erro ao buscar noticia específica:', error);
            res.status(500).json({ error: 'Erro ao buscar noticia' });
        }
  }


}