import { User } from './user';

export class Book {
  author: string;
  date: string;
  gender: string;
  isbn: string;
  metadata: string;
  title: string;
  users: User[];

  constructor(title: string, author: string, metadata: string, users: User[]) {
    this.author = author.trim();
    this.date = metadata.substring(50) ? new Date(Number(metadata.substring(50)) * 1000).toISOString().substring(0, 10) : '';
    this.gender = metadata.substring(18, 30).trim();
    this.isbn = metadata.substring(1, 18);
    this.metadata = metadata;
    this.title = title.trim();
    this.users = users;
  }
}
