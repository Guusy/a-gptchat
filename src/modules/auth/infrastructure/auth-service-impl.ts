import { authOptions } from "@/app/api/lib/auth";
import { getServerSession } from "next-auth";
import { NotValidSession } from "../domain/exception/NotValidSession";

class AuthServiceImpl {
  async getAuthUserDetails(): Promise<{ id: string }> {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new NotValidSession();
    }
    return Promise.resolve({ id: session.user.id });
  }
}
const authService = new AuthServiceImpl();

export default authService;
