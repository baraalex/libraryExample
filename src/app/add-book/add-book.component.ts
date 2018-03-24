import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  data = {
    title: '',
    author: '',
    isbn: '',
    date: '',
    gender: ''
  };
  title: string;

  constructor(private router: Router, private library: LibraryService) {}

  ngOnInit() {}

  addBook() {
    console.log('data', this.data);
    const date = new Date(this.data.date);
    this.library.addBook(this.data.title, this.data.author, this.data.isbn, date, this.data.gender).then(() => {
      this.router.navigate(['/list']);
    });
  }
}
