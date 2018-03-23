import { Injectable } from '@angular/core';
import { BooksService } from './books-service.service';
import { Book } from './book';

@Injectable()
export class LibraryService {
  private books: Book[] = [];

  constructor(private booksService: BooksService) {}

  init = () => {
    return new Promise((resolve, reject) => {
      this.booksService.getBooks().subscribe(libraryFetched => {
        this.setBooks(libraryFetched.books);
        resolve(true);
      });
    });
  }

  getBooks = () => this.books;

  setBooks = (libraryBooks: any[]) => {
    this.books = [];
    for (let index = 0; index < libraryBooks.length; index++) {
      const element = libraryBooks[index];
      const book = new Book(
        element.title,
        element.author,
        element.metadata,
        element.users
      );

      this.books.push(book);
    }
  }
}
