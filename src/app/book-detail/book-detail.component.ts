import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { LibraryService } from '../library-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[];
  bookSelected: Book;

  constructor(private route: ActivatedRoute, private library: LibraryService) {}

  ngOnInit() {
    const isbn = this.route.snapshot.paramMap.get('id');
    this.books = this.library.getBooks();

    this.books.some(element => {
      if (element.isbn === isbn) {
        this.bookSelected = element;
        return true;
      }
    });
  }
}
