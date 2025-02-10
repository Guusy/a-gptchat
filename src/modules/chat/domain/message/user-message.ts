import { MAX_TOKENS } from "@/lib/constants";
import Message from "./message";

export default class UserMessage extends Message {
  constructor(content: string) {
    super(content);
    this.role = "user";
  }

  getTokens() {
    return this.content.trim().split(/\s+/).length;
  }

  exceedsMaxTokenLimit(): boolean {
    return this.getTokens() > MAX_TOKENS;
  }
}
