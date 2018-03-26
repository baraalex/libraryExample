import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksListComponent } from './books-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BooksListComponent],
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
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
