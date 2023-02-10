import { User } from "@prisma/client";
import prisma from "../database/client";
class UserService {
  /**
   * It creates a new user in the database using the data provided in the user argument
   * @param {User} user - User - This is the user object that we're passing in.
   * @returns A promise that resolves to the created user.
   */
  createUser(user: User) {
    return prisma.user.create({ data: user });
  }

  /**
   * It returns the first user whose email matches the email argument
   * @param {string} email - string
   * @returns A promise that resolves to a user object.
   */
  findUserByEmail(email: string) {
    return prisma.user.findFirst({ where: { email } });
  }
}

export default new UserService();
