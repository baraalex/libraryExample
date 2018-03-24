import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { LibraryService } from '../library-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[];
  bookSelected: Book;
  edit: false;
  dateFormated: string;
  isbnOriginal: string;

  constructor(private router: Router, private route: ActivatedRoute, private library: LibraryService) {}

  ngOnInit() {
    const isbn = this.route.snapshot.paramMap.get('id');
    this.books = this.library.getBooks();

    this.books.some(element => {
      if (element.isbn === isbn) {
        this.bookSelected = new Book(element.title, element.author, element.metadata, element.users);
        this.isbnOriginal = element.isbn;
        this.dateFormated = new Date(element.date).toISOString().substring(0, 10);
        return true;
      }
    });
  }

  editBook = () => {
    this.library
      .editBook(
        this.bookSelected.title,
        this.bookSelected.author,
        this.bookSelected.isbn,
        new Date(this.dateFormated),
        this.bookSelected.gender,
        this.isbnOriginal
      )
      .then(
        result => {
          this.router.navigate(['/list']);
        },
        error => {}
      );
  };
}
