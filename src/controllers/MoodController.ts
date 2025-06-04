import { Request, Response } from "express";
import { FirebaseService } from "../services/FirebaseService";
import { CreateMoodDTO, UpdateMoodDTO } from "../models/Mood";
import { v4 as uuidv4 } from "uuid";

export class MoodController {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = FirebaseService.getInstance();
  }

  async createMood(req: Request, res: Response): Promise<void> {
    try {
      const moodData: CreateMoodDTO = req.body;
      const mood = await this.firebaseService.createMood({
        ...moodData,
        id: uuidv4(),
        userId: req.user!.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      void res.status(201).json(mood);
    } catch (error) {
      void res.status(500).json({ error: "Erro ao registrar humor" });
    }
  }

  async getMoods(req: Request, res: Response): Promise<void> {
    try {
      const moods = await this.firebaseService.getMoodsByUserId(req.user!.uid);
      void res.json(moods);
    } catch (error) {
      void res.status(500).json({ error: "Erro ao buscar registros de humor" });
    }
  }

  async updateMood(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const moodData: UpdateMoodDTO = req.body;

      await this.firebaseService.updateMood(id, {
        ...moodData,
        updatedAt: new Date().toISOString(),
      });
      void res.status(204).send();
    } catch (error) {
      void res
        .status(500)
        .json({ error: "Erro ao atualizar registro de humor" });
    }
  }

  async deleteMood(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const moods = await this.firebaseService.getMoodsByUserId(req.user!.uid);
      const moodBelongsToUser = moods.some((mood) => mood.id === id);

      if (!moodBelongsToUser) {
        void res.status(403).json({
          error: "Você não tem permissão para deletar este registro de humor",
        });
        return;
      }

      await this.firebaseService.deleteMood(id);
      void res.status(204).send();
    } catch (error) {
      void res.status(500).json({ error: "Erro ao deletar registro de humor" });
    }
  }
}
