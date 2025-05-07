import { Request, Response } from 'express';
import { FirebaseService } from '../services/FirebaseService';
import { CreateGoalDTO, UpdateGoalDTO } from '../models/Goal';
import { v4 as uuidv4 } from 'uuid';

export class GoalController {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = FirebaseService.getInstance();
  }

  async createGoal(req: Request, res: Response): Promise<void> {
    try {
      const goalData: CreateGoalDTO = req.body;
      const goal = await this.firebaseService.createGoal({
        ...goalData,
        deadline: new Date(goalData.deadline).toISOString(),
        id: uuidv4(),
        userId: req.user!.uid,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      void res.status(201).json(goal);
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao criar meta' });
    }
  }

  async getGoals(req: Request, res: Response): Promise<void> {
    try {
      const { completed } = req.query;
      const goals = await this.firebaseService.getGoalsByUserId(
        req.user!.uid,
        completed !== undefined ? completed === 'true' : undefined
      );
      void res.json(goals);
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao buscar metas' });
    }
  }

  async updateGoal(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const goalData: UpdateGoalDTO = req.body;

      await this.firebaseService.updateGoal(id, {
        ...goalData,
        deadline: goalData.deadline ? new Date(goalData.deadline).toISOString() : undefined,
        updatedAt: new Date().toISOString()
      });
      void res.status(204).send();
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao atualizar meta' });
    }
  }

  async deleteGoal(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.firebaseService.deleteGoal(id);
      void res.status(204).send();
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao deletar meta' });
    }
  }
} 