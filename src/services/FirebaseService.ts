import { db } from '../config/firebase';
import { IUser } from '../models/User';
import { IUserMood } from '../models/Mood';
import { IUserGoal } from '../models/Goal';
import { Timestamp } from 'firebase-admin/firestore';

export class FirebaseService {
  private static instance: FirebaseService;

  private constructor() {}

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async createUser(data: IUser): Promise<IUser> {
    const userRef = db.collection('users').doc(data.id);
    await userRef.set(data);
    return data;
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      console.log('Buscando usuário com ID:', id);
      const userDoc = await db.collection('users').doc(id).get();
      
      if (!userDoc.exists) {
        console.log('Usuário não encontrado');
        return null;
      }
      
      const data = userDoc.data() as any;
      console.log('Dados do usuário:', data);
      
      return {
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        updatedAt: (data.updatedAt as Timestamp).toDate().toISOString()
      };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: Timestamp.fromDate(new Date(data.updatedAt as string))
    };
    await db.collection('users').doc(id).update(updateData);
  }

  async createMood(data: IUserMood): Promise<IUserMood> {
    try {
      console.log('Criando humor no Firestore:', data);
      const moodRef = db.collection('moods').doc(data.id);
      await moodRef.set(data);
      console.log('Humor criado com sucesso no Firestore');
      return data;
    } catch (error) {
      console.error('Erro ao criar humor no Firestore:', error);
      throw error;
    }
  }

  async getMoodsByUserId(userId: string, startDate?: Date, endDate?: Date): Promise<IUserMood[]> {
    try {
      console.log('Buscando humores para usuário:', userId);
      let query = db.collection('moods').where('userId', '==', userId);

      const snapshot = await query.get();
      console.log('Humores encontrados:', snapshot.size);
      
      let moods = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          date: data.date,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      });

      // Filtrando por data em memória
      if (startDate && endDate) {
        moods = moods.filter(mood => {
          const moodDate = new Date(mood.date);
          return moodDate >= startDate && moodDate <= endDate;
        });
      }

      // Ordenando por data em memória
      return moods.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Erro ao buscar humores:', error);
      throw error;
    }
  }

  async updateMood(id: string, data: Partial<IUserMood>): Promise<void> {
    try {
      console.log('Atualizando humor no Firestore:', { id, data });
      await db.collection('moods').doc(id).update(data);
      console.log('Humor atualizado com sucesso no Firestore');
    } catch (error) {
      console.error('Erro ao atualizar humor no Firestore:', error);
      throw error;
    }
  }

  async createGoal(data: IUserGoal): Promise<IUserGoal> {
    const goalRef = db.collection('goals').doc(data.id);
    await goalRef.set({
      id: data.id,
      userId: data.userId,
      title: data.title,
      deadline: data.deadline,
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    });
    return data;
  }

  async getGoalsByUserId(userId: string, completed?: boolean): Promise<IUserGoal[]> {
    try {
      console.log('Buscando metas para usuário:', userId);
      let query = db.collection('goals').where('userId', '==', userId);

      const snapshot = await query.get();
      console.log('Metas encontradas:', snapshot.size);
      
      let goals = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          deadline: data.deadline,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        };
      });

      // Filtrando por status em memória
      if (completed !== undefined) {
        goals = goals.filter(goal => goal.completed === completed);
      }

      // Ordenando por deadline em memória
      return goals.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } catch (error) {
      console.error('Erro ao buscar metas:', error);
      throw error;
    }
  }

  async updateGoal(id: string, data: Partial<IUserGoal>): Promise<void> {
    await db.collection('goals').doc(id).update({
      ...(data.title !== undefined && { title: data.title }),
      ...(data.deadline !== undefined && { deadline: data.deadline }),
      ...(data.completed !== undefined && { completed: data.completed }),
      ...(data.updatedAt !== undefined && { updatedAt: data.updatedAt })
    });
  }

  async deleteGoal(id: string): Promise<void> {
    await db.collection('goals').doc(id).delete();
  }

  async deleteMood(id: string): Promise<void> {
    try {
      console.log('Deletando humor no Firestore:', id);
      await db.collection('moods').doc(id).delete();
      console.log('Humor deletado com sucesso no Firestore');
    } catch (error) {
      console.error('Erro ao deletar humor no Firestore:', error);
      throw error;
    }
    }
  }
} 