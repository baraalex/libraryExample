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

@NgModule({
  declarations: [AppComponent, BooksListComponent, BooksTableComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
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
