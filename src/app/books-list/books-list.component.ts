import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterContentChecked
} from '@angular/core';
import { Book } from '../book';
import { LibraryService } from '../library-service.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.less']
})
export class BooksListComponent implements OnInit {
  books: Book[];

  constructor(private library: LibraryService) {}

  ngOnInit() {
    this.books = this.library.getBooks();
  }
}
