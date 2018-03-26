import { AddBookComponent } from '../add-book/add-book.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BooksListComponent } from '../books-list/books-list.component';
import { BooksService } from '../books-service.service';
import { LibraryService } from '../library-service.service';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearcherComponent } from '../searcher/searcher.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: BooksListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'search', component: SearcherComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'user/:id', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
