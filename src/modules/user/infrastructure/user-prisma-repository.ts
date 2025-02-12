import { PrismaClient } from "@prisma/client";
import User, { UserBuilder } from "../domain/user";
import UserRepository from "../domain/user-repository";
import prisma from "@/modules/shared/prisma";
import AllowedUser from "../domain/allowed-user";

export default class UserPrismaRepository implements UserRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findOrCreate(user: User): Promise<User> {
    const userDB = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: { ...user },
    });
    return new UserBuilder()
      .setId(userDB.id)
      .setName(userDB.name)
      .setEmail(userDB.email)
      .setImage(userDB.image)
      .build();
  }

  findAllowedUser(email: string): Promise<AllowedUser | null> {
    //TODO: migrate to redis
    return this.prisma.allowedUser.findUnique({ where: { email } });
  }
}
