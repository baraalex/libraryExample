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
  };

  getBooks = () => this.books;

  setBooks = (libraryBooks: any[]) => {
    this.books = [];
    for (let index = 0; index < libraryBooks.length; index++) {
      const element = libraryBooks[index];
      const book = new Book(element.title, element.author, element.metadata, element.users);

      this.books.push(book);
    }
  };

  addBook = (title: string, author: string, isbn: string, date: Date, gender: string) => {
    return new Promise((resolve, reject) => {
      while (gender.length < 12) {
        gender += ' ';
      }
      let dateUnix = Math.round(date.getTime() / 1000).toString();

      while (dateUnix.length < 15) {
        dateUnix = '0' + dateUnix;
      }

      const metadata = 'L' + isbn + gender + '                    ' + dateUnix;

      const book = new Book(title, author, metadata, []);
      this.books.push(book);
      resolve(true);
    });
  };

  editBook = (title: string, author: string, isbn: string, date: Date, gender: string, originalIsbn: string) => {
    return new Promise((resolve, reject) => {
      let index = -1;

      const found = this.books.some((element, ind) => {
        index = element.isbn === originalIsbn ? ind : index;
        return element.isbn === originalIsbn;
      });

      if (!found) {
        reject('not founded book');
      } else {
        while (gender.length < 12) {
          gender += ' ';
        }
        let dateUnix = Math.round(date.getTime() / 1000).toString();

        while (dateUnix.length < 15) {
          dateUnix = '0' + dateUnix;
        }

        const metadata = 'L' + isbn + gender + '                    ' + dateUnix;

        this.books[index].title = title.trim();
        this.books[index].author = author.trim();
        this.books[index].metadata = metadata.trim();
        this.books[index].isbn = isbn.trim();
        this.books[index].gender = gender.trim();
        this.books[index].date = date.toISOString().substring(0, 10);

        resolve(true);
      }
    });
  };
}
