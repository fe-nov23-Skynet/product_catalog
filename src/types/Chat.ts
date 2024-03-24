export interface Message {
  authorId: number;
  avatarURL: string;
  authorName: string;
  body: string;
  role: string;
}

export interface Room {
  id: string;
  messages: Message[];
}
