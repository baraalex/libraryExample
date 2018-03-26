import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { LibraryService } from './library-service.service';
import { Book } from './book';

function IsbnValidator(books: Book[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const found = books.some(element => element.isbn === control.value);
    return found ? { isbn: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appIsbnValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IsbnValidatorDirective, multi: true }]
})
export class IsbnValidatorDirective implements Validator, OnInit {
  @Input() activeFilter: boolean;
  books: Book[];

  constructor(private library: LibraryService) {}

  ngOnInit() {
    this.books = this.library.getBooks();
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.activeFilter ? IsbnValidator(this.books)(control) : null;
  }
}
