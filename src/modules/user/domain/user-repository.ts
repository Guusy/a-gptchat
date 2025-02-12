import AllowedUser from "./allowed-user";
import User from "./user";

export default interface UserRepository {
  findOrCreate(user: User): Promise<User>;
  findAllowedUser(email: string): Promise<AllowedUser | null>;
}
