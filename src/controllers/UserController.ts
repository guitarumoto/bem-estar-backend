import { Request, Response } from 'express';
import { FirebaseService } from '../services/FirebaseService';
import { CreateUserDTO, UpdateUserDTO } from '../models/User';
import { getAuth } from 'firebase-admin/auth';

export class UserController {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = FirebaseService.getInstance();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDTO = req.body;
      const auth = getAuth();
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
      });
      const user = await this.firebaseService.createUser({
        ...userData,
        id: userRecord.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      void res.status(201).json(user);
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.firebaseService.getUserById(req.user!.uid);
      if (!user) {
        void res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      void res.json(user);
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: UpdateUserDTO = req.body;
      await this.firebaseService.updateUser(req.user!.uid, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
      void res.status(204).send();
    } catch (error) {
      void res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }
} 