import { Book } from './book';
import { IsbnValidatorDirective } from './isbn-validator.directive';
import { of } from 'rxjs/observable/of';
import { LibraryServiceSpy } from './tests/library-service.stub';

describe('IsbnValidatorDirective', () => {
  it('should create an instance', () => {
    let libraryService: LibraryServiceSpy;
    const directive = new IsbnValidatorDirective(libraryService);
    expect(directive).toBeTruthy();
  });
});
