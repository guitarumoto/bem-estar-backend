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
      
      // Verificar se já existe um humor para hoje
      const todayMood = await this.firebaseService.getTodayMoodByUserId(req.user!.uid);
      
      if (todayMood) {
        void res.status(409).json({ 
          error: "Já existe um registro de humor para hoje. Use o endpoint de atualização para modificar o registro existente." 
        });
        return;
      }
      
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

  async getTodayMood(req: Request, res: Response): Promise<void> {
    try {
      const todayMood = await this.firebaseService.getTodayMoodByUserId(req.user!.uid);
      
      if (!todayMood) {
        void res.status(404).json({ error: "Nenhum registro de humor encontrado para hoje" });
        return;
      }
      
      void res.json(todayMood);
    } catch (error) {
      void res.status(500).json({ error: "Erro ao buscar humor do dia" });
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
