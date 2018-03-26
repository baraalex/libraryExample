import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksTableComponent } from './books-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';
import { RouterLinkDirectiveStub } from '../tests/router-link-directive.stub';

describe('BooksTableComponent', () => {
  let component: BooksTableComponent;
  let fixture: ComponentFixture<BooksTableComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BooksTableComponent, RouterLinkDirectiveStub],
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
    fixture = TestBed.createComponent(BooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
