import UserServiceImpl from "../user/application/user-service-impl";
import UserService from "../user/domain/user-service";

export default function getUserService(): UserService {
  return new UserServiceImpl();
}
