export interface Message {
  authorId: number;
  avatarURL: string;
  authorName: string;
  body: string;
}

export interface Room {
  id: number;
  messages?: Message[];
}
