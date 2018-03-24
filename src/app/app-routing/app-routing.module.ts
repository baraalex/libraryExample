import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from '../books-list/books-list.component';
import { LibraryService } from '../library-service.service';
import { BooksService } from '../books-service.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { AddBookComponent } from '../add-book/add-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: BooksListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'book/:id', component: BookDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
