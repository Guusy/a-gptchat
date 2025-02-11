import { authOptions } from "@/app/api/lib/auth";
import { getServerSession } from "next-auth";
import { NotValidSession } from "../domain/exception/NotValidSession";

class AuthServiceImpl {
  async getAuthUserDetails(): Promise<{ id: string }> {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new NotValidSession();
    }
    // TODO: use the real id
    return Promise.resolve({ id: "cm6wap5i900002845efpd0cce" });
  }
}
const authService = new AuthServiceImpl();

export default authService;
