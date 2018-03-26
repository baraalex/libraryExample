import { Book } from './book';
import { BooksService } from './books-service.service';
import { inject, TestBed } from '@angular/core/testing';
import { LibraryService } from './library-service.service';
import { of } from 'rxjs/observable/of';

describe('LibraryServiceService', () => {
  let booksServiceSpy: { getBooks: jasmine.Spy };
  let library: LibraryService;

  beforeEach(() => {
    booksServiceSpy = jasmine.createSpyObj('BooksService', ['getBooks']);

    library = new LibraryService(<any>booksServiceSpy);
  });

  it('should be created', () => {
    expect(library).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedBooks: Book[] = [];

    booksServiceSpy.getBooks.and.returnValue(of(expectedBooks));

    library.init();

    expect(booksServiceSpy.getBooks.calls.count()).toBe(1, 'one call');
  });

  it('set Books and Get Books', () => {
    const bookTest = new Book('title Test', 'Test author', 'L978-3-598-21500-1novela                          000000221184000', []);
    const expectedBooks: Book[] = [bookTest];

    library.setBooks(expectedBooks);
    const books = library.getBooks();

    expect(books).toEqual(expectedBooks);
  });

  it('add Book', () => {
    const bookTest = new Book('title Test', 'Test author', 'L123-4-567-89012-3novela                          000000221184000', []);

    const expectedBooks: Book[] = [bookTest];

    library.setBooks([]);
    library.addBook(bookTest.title, bookTest.author, bookTest.isbn, new Date(bookTest.date), bookTest.gender);

    const books = library.getBooks();

    expect(books[0]).toEqual(bookTest);
  });

  it('edit Book ok', () => {
    const bookTest = new Book('title Test', 'Test author', 'L123-4-567-89012-3novela                          000000221184000', []);
    const bookTest2 = new Book('title Test2', 'Test author2', 'L123-4-567-89012-4novela2                         000000221184000', []);

    const expectedBooks: Book[] = [bookTest];

    library.setBooks(expectedBooks);
    library.editBook('title Test2', 'Test author2', '123-4-567-89012-4', new Date(bookTest.date), 'novela2', '123-4-567-89012-3');

    const books = library.getBooks();

    expect(books[0]).toEqual(bookTest2);
  });

  it('edit Book KO', () => {
    const bookTest = new Book('title Test', 'Test author', 'L123-4-567-89012-3novela                          000000221184000', []);
    const bookTest2 = new Book('title Test2', 'Test author2', 'L123-4-567-89012-4novela2                         000000221184000', []);

    const expectedBooks: Book[] = [bookTest];

    library.setBooks(expectedBooks);
    library.editBook('title Test2', 'Test author2', '123-4-567-89012-4', new Date(bookTest.date), 'novela2', '123-4-567-89012-4');

    const books = library.getBooks();

    expect(books[0]).toEqual(bookTest);
  });
});
