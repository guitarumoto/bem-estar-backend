export interface IUserMood {
  id: string;
  userId: string;
  mood: number;
  note?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMoodDTO {
  userId: string;
  mood: number;
  note?: string;
  date: Date;
}

export interface UpdateMoodDTO {
  mood?: number;
  note?: string;
  date?: Date;
} 