import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailComponent],
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
    activatedRoute.setParamMap({ id: '' });
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
