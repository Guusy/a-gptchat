export default abstract class Message {
  id?: string;
  role!: string;
  content: string;

  constructor(content: string) {
    this.content = content;
  }
}
