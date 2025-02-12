import User from "./user";

export default interface UserService {
  createUserIfNotExists(user: User): Promise<User>;
  isAnAllowedUser(email: string): Promise<boolean>;
}
