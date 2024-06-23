import { IUser } from '@/types/user.interface';

const USERS = 'users';
const BASE_URL = process.env.SERVER_URL;
const BASE_USER_URL = `${BASE_URL}/${USERS}`;

export const UserService = {
  async getAll() {
    const response = await fetch(`${BASE_USER_URL}`);
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${BASE_USER_URL}/${id}`);
    return response.json();
  },

  async update(user: IUser) {
    const response = await fetch(`${BASE_USER_URL}/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  async create(user: IUser) {
    const response = await fetch(`${BASE_USER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response.json();
  },

  async delete(userId: string) {
    await fetch(`${BASE_USER_URL}/${userId}`, {
      method: 'DELETE',
    });
    return userId;
  },
};
