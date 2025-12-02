import prisma from "../applications/database";
import User from "../types/user.type";

class UserService {
  static async getAll(): Promise<User[] | null> {
    const users = await prisma.user.findMany();
    return users;
  }

  static async delete(username: string): Promise<void> {
    await prisma.user.delete({
      where: { username: username },
    });
  }
}

export default UserService;
