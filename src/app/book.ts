import { User } from './user';

export class Book {
  author: string;
  date: number;
  gender: string;
  isbn: string;
  metadata: string;
  title: string;
  users: User[];

  constructor(title: string, author: string, metadata: string, users: User[]) {
    this.author = author;
    this.date = Number(metadata.substring(50)) * 1000;
    this.gender = metadata.substring(18, 30);
    this.isbn = metadata.substring(1, 18);
    this.metadata = metadata;
    this.title = title;
    this.users = users;
  }
}
