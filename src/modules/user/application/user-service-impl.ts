import UserRepository from "../domain/user-repository";
import UserService from "../domain/user-service";
import User from "../domain/user";
import UserRepositoryImpl from "../infrastructure/user-repository-impl";

export default class UserServiceImpl implements UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }
  
  createUserIfNotExists(user: User): Promise<User> {
    return this.userRepository.findOrCreate(user);
  }

  async isAnAllowedUser(email: string): Promise<boolean> {
    const allowedUser = await this.userRepository.findAllowedUser(email);
    return !!allowedUser
  }
}
