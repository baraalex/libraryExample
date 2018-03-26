import { Book } from '../book';
import { of } from 'rxjs/observable/of';

export class BooksServiceSpy {
  testHero: Book[] = [];
  private asyncData = data => of(data);

  /* emit cloned test hero */
  getBooks = jasmine.createSpy('getBooks').and.callFake(() => this.asyncData(Object.assign({}, this.testHero)));
}
