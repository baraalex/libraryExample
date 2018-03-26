import { Book } from '../book';
import { LibraryService } from '../library-service.service';
import { of } from 'rxjs/observable/of';

export class LibraryServiceSpy extends LibraryService {
  testBook: Book[] = [new Book('', '', '', [])];
  constructor() {
    super(null);
  }

  /* emit cloned test hero */
  getBooks = jasmine.createSpy('getBooks').and.callFake(() => this.testBook);
}
