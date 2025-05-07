export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: 'male' | 'female' | 'other';
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
} 