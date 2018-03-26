import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  books: Book[] = [];
  user: User;
  private userId: string;

  constructor(private route: ActivatedRoute, private library: LibraryService) {}

  ngOnInit() {
    const books = this.library.getBooks();
    this.route.paramMap.subscribe(pmap => (this.userId = pmap.get('id')));

    for (let index = 0; index < books.length; index++) {
      const bookLibrary = books[index];

      const foundUser = bookLibrary.users.some(userBook => {
        if (userBook.id.toString() === this.userId && !this.user) {
          this.user = userBook;
        }
        return userBook.id.toString() === this.userId;
      });
      if (foundUser) {
        this.books.push(bookLibrary);
      }
    }
  }
}
