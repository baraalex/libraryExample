import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksService } from './books-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LibraryService } from './library-service.service';
import { BooksTableComponent } from './books-table/books-table.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { MaxTodayDirective } from './max-today.directive';
import { SearcherComponent } from './searcher/searcher.component';
import { BookFormComponent } from './book-form/book-form.component';
import { IsbnValidatorDirective } from './isbn-validator.directive';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AppComponent, BooksListComponent, BooksTableComponent, BookDetailComponent, AddBookComponent, MaxTodayDirective, SearcherComponent, BookFormComponent, IsbnValidatorDirective, UsersComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [
    BooksService,
    LibraryService,
    {
      provide: APP_INITIALIZER,
      useFactory: libraryProviderFactory,
      deps: [LibraryService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function libraryProviderFactory(provider: LibraryService) {
  return () => provider.init();
}
