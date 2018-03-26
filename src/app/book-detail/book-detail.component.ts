import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { LibraryService } from '../library-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.less']
})
export class BookDetailComponent implements OnInit {
  books: Book[];
  book: Book;
  bookSelected: Book;
  edit = false;
  isbnOriginal: string;

  constructor(private router: Router, private route: ActivatedRoute, private library: LibraryService) {}

  ngOnInit() {
    let isbn;
    this.route.paramMap.subscribe(pmap => (isbn = pmap.get('id')));
    this.books = this.library.getBooks();

    this.books.some(element => {
      if (element.isbn === isbn) {
        this.book = element;
        this.bookSelected = new Book(element.title, element.author, element.metadata, element.users);
        this.isbnOriginal = element.isbn;
        return true;
      }
    });
  }

  editBook = (bookEdited: Book) => {
    this.library
      .editBook(bookEdited.title, bookEdited.author, bookEdited.isbn, new Date(bookEdited.date), bookEdited.gender, this.isbnOriginal)
      .then(
        result => {
          this.router.navigate(['/book/' + bookEdited.isbn]);
          this.edit = false;
        },
        error => {}
      );
  };

  cancel = () => {
    this.edit = false;
    this.bookSelected = new Book(this.book.title, this.book.author, this.book.metadata, this.book.users);
  };
}
