import { Book } from './book';
import { BooksService } from './books-service.service';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

describe('BooksServiceService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let booksService: BooksService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    booksService = new BooksService(<any>httpClientSpy);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedBooks: Book[] = [];

    httpClientSpy.get.and.returnValue(of(expectedBooks));

    booksService.getBooks().subscribe(books => expect(books).toEqual(expectedBooks, 'expected books'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
