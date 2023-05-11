import { Service } from 'typedi';
import { User } from '@interfaces/users.interface';
import { getClientWithKeyspace } from '@/database/config';

@Service()
export class UserService {
  private connection: any;

  constructor() {
    this.connection = this.getConnection();
  }

  private async getConnection() {
    this.connection = await getClientWithKeyspace();
  }

  async createUser(user: User) {
    const query = 'INSERT INTO users(id, name, isAdmin) VALUES (uuid(), ?, ?);';
    const result = await this.connection.execute(query, [user.name, user.isAdmin], {
      prepare: true,
    });
    return result.rows;
  }

  async getUserById(id: string) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await this.connection.execute(query, [id]);
    const user = result.rows[0];
    return user;
  }

  async getAllUsers() {
    const query = `
      SELECT * FROM users
`;
    const result = await this.connection.execute(query);
    return result.rows;
  }

  async updateUser(userId, user: User) {
    const query = `
      UPDATE users
      SET isAdmin = ?
      WHERE id = ?
    `;
    const result = await this.connection.execute(query, [user.isAdmin, userId]);
    return result.rows;
  }

  async deleteUserById(id: string) {
    const query = `
      DELETE FROM users WHERE id = ?
    `;
    const result = await this.connection.execute(query, [id]);
    return result.rows;
  }
}
