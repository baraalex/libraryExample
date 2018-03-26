import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../book';
import { BookFormComponent } from './book-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsbnValidatorDirective } from '../isbn-validator.directive';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [BookFormComponent, IsbnValidatorDirective],
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
    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    component.book = new Book('', '', '', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
