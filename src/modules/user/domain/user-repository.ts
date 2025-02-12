import User from "./user";

export default interface UserRepository {
  findOrCreate(user: User): Promise<User>;
}
