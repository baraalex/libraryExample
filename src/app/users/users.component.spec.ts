import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLinkDirectiveStub } from '../tests/router-link-directive.stub';
import { Book } from '../book';
import { User } from '../user';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [UsersComponent, RouterLinkDirectiveStub],
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: LibraryService, useValue: library }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    activatedRoute.setParamMap({ id: '1' });
    const user: User = { id: 1, name: 'test' };

    const bookTest = new Book('title Test', 'Test author', 'L978-3-598-21500-1novela                          000000221184000', [user]);
    const expectedBooks: Book[] = [bookTest];

    library.setBooks(expectedBooks);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
