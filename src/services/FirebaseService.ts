import { db } from "../config/firebase";
import { IUser } from "../models/User";
import { IUserMood } from "../models/Mood";
import { IUserGoal } from "../models/Goal";
import { Timestamp } from "firebase-admin/firestore";

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
    const userRef = db.collection("users").doc(data.id);
    await userRef.set(data);
    return data;
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const userDoc = await db.collection("users").doc(id).get();

      if (!userDoc.exists) {
        return null;
      }

      const data = userDoc.data() as any;

      return {
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        updatedAt: (data.updatedAt as Timestamp).toDate().toISOString(),
      };
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<void> {
    const updateData = {
      ...data,
      updatedAt: Timestamp.fromDate(new Date(data.updatedAt as string)),
    };
    await db.collection("users").doc(id).update(updateData);
  }

  async createMood(data: IUserMood): Promise<IUserMood> {
    try {
      const moodRef = db.collection("moods").doc(data.id);
      await moodRef.set(data);
      return data;
    } catch (error) {
      console.error("Erro ao criar humor no Firestore:", error);
      throw error;
    }
  }

  async getMoodsByUserId(userId: string): Promise<IUserMood[]> {
    try {
      let query = db.collection("moods").where("userId", "==", userId);

      const snapshot = await query.get();

      let moods = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });

      return moods;
    } catch (error) {
      console.error("Erro ao buscar humores:", error);
      throw error;
    }
  }

  async updateMood(id: string, data: Partial<IUserMood>): Promise<void> {
    try {
      await db.collection("moods").doc(id).update(data);
    } catch (error) {
      console.error("Erro ao atualizar humor no Firestore:", error);
      throw error;
    }
  }

  async createGoal(data: IUserGoal): Promise<IUserGoal> {
    const goalRef = db.collection("goals").doc(data.id);
    await goalRef.set({
      id: data.id,
      userId: data.userId,
      title: data.title,
      deadline: data.deadline,
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    return data;
  }

  async getGoalsByUserId(
    userId: string,
    completed?: boolean
  ): Promise<IUserGoal[]> {
    try {
      let query = db.collection("goals").where("userId", "==", userId);

      const snapshot = await query.get();

      let goals = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          ...data,
          deadline: data.deadline,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
      });

      if (completed !== undefined) {
        goals = goals.filter((goal) => goal.completed === completed);
      }

      return goals.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    } catch (error) {
      console.error("Erro ao buscar metas:", error);
      throw error;
    }
  }

  async updateGoal(id: string, data: Partial<IUserGoal>): Promise<void> {
    await db
      .collection("goals")
      .doc(id)
      .update({
        ...(data.title !== undefined && { title: data.title }),
        ...(data.deadline !== undefined && { deadline: data.deadline }),
        ...(data.completed !== undefined && { completed: data.completed }),
        ...(data.updatedAt !== undefined && { updatedAt: data.updatedAt }),
      });
  }

  async deleteGoal(id: string): Promise<void> {
    await db.collection("goals").doc(id).delete();
  }

  async deleteMood(id: string): Promise<void> {
    try {
      await db.collection("moods").doc(id).delete();
    } catch (error) {
      console.error("Erro ao deletar humor no Firestore:", error);
      throw error;
    }
  }
}
