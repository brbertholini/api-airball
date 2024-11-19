import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  static async updateUser(req: Request, res: Response) { 
    const { name, prefered_position, avatar, bio } = req.body;
    const { id } = req.params;

    try {
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        return res.status(400).json({ error: "ID invalido" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: numericId },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Atualiza o usuário
      const updatedUser = await prisma.user.update({
        where: { id: numericId },
        data: {
            name: name ?? existingUser.name, 
            prefered_position: prefered_position ?? existingUser.prefered_position,
            avatar: avatar ?? existingUser.avatar,
            bio: bio ?? existingUser.bio,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  }
}