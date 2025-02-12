import UserRepository from "../domain/user-repository";
import UserService from "../domain/user-service";
import UserPrismaRepository from "../infrastructure/user-prisma-repository";
import User from "../domain/user";

export default class UserServiceImpl implements UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserPrismaRepository();
  }
  createUserIfNotExists(user: User): Promise<User> {
    return this.userRepository.findOrCreate(user);
  }
}
