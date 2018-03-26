import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { Router } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.less']
})
export class AddBookComponent implements OnInit {
  book: Book;

  constructor(private router: Router, private library: LibraryService) {}

  ngOnInit() {
    this.book = new Book('', '', '', []);
  }

  addBook(newBook: Book) {
    const date = new Date(newBook.date);
    this.library.addBook(newBook.title, newBook.author, newBook.isbn, date, newBook.gender).then(() => {
      this.router.navigate(['/list']);
    });
  }
}
