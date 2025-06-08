export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  id: string
  name: string;
  email: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
