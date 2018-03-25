import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.less']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book;
  @Input() originalIsbn?: string;
  @Input() showCancel? = false;

  @Output() onSubmit = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  submit = () => {
    this.onSubmit.emit(this.book);
  };
  cancel = () => {
    this.onCancel.emit();
  };
}
