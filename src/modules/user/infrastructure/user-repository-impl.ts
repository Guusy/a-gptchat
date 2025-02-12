import { PrismaClient } from "@prisma/client";
import User, { UserBuilder } from "../domain/user";
import UserRepository from "../domain/user-repository";
import prisma from "@/modules/shared/prisma";
import AllowedUser from "../domain/allowed-user";
import Redis from "ioredis";

export default class UserRepositoryImpl implements UserRepository {
  prisma: PrismaClient;
  redis: Redis;

  constructor() {
    this.prisma = prisma;
    this.redis = new Redis(process.env.REDIS_URL!); // Conexión a Redis
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

  async findAllowedUser(email: string): Promise<AllowedUser | null> {
    const exists = await this.redis.sismember("allowed_users", email);
    if (exists) {
      return { email };
    }
    return null;
  }
}
