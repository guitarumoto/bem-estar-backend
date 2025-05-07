export interface IUserGoal {
  id: string;
  userId: string;
  title: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalDTO {
  userId: string;
  title: string;
  deadline: Date;
}

export interface UpdateGoalDTO {
  title?: string;
  deadline?: Date;
  completed?: boolean;
} 