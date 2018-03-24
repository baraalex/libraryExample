import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { Book } from '../book';
import { element } from 'protractor';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  text = '';
  options = ['title', 'author', 'isbn', 'gender'];
  disabled = {
    author: false,
    gender: false,
    isbn: false,
    title: false
  };
  optionsChecked = [];

  booksOriginal: Book[];
  books: Book[];

  constructor(private library: LibraryService) {}

  ngOnInit() {
    this.booksOriginal = Object.assign([], this.library.getBooks());
    this.books = Object.assign([], this.booksOriginal);
  }

  updateOptions(option, event) {
    if (event.currentTarget.checked) {
      this.optionsChecked.push(option);
    } else {
      this.optionsChecked.splice(this.optionsChecked.indexOf(option), 1);
    }
    this.disabled.author = this.optionsChecked.indexOf('title') >= 0 || this.optionsChecked.indexOf('isbn') >= 0;
    this.disabled.gender = this.optionsChecked.indexOf('title') >= 0 || this.optionsChecked.indexOf('isbn') >= 0;
    this.disabled.isbn =
      this.optionsChecked.indexOf('title') >= 0 || this.optionsChecked.indexOf('gender') >= 0 || this.optionsChecked.indexOf('author') >= 0;
    this.disabled.title =
      this.optionsChecked.indexOf('gender') >= 0 || this.optionsChecked.indexOf('isbn') >= 0 || this.optionsChecked.indexOf('author') >= 0;
  }

  search = () => {
    if (this.text) {
      this.books = this.booksOriginal.filter((element, index) => {
        let found = false;

        for (let index = 0; index < this.optionsChecked.length && !found; index++) {
          const option = this.optionsChecked[index];
          const term = this.text.toLowerCase();
          const elementProperty = element[option].toLowerCase();
          found = found || elementProperty.includes(term);
        }

        return found;
      });
    } else {
      this.books = Object.assign([], this.booksOriginal);
    }
  };
}
