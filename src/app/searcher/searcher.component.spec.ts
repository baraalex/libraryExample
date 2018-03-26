import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from '../tests/activated-route.stub';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IsbnValidatorDirective } from '../isbn-validator.directive';
import { LibraryService } from '../library-service.service';
import { LibraryServiceSpy } from '../tests/library-service.stub';
import { RouterLinkDirectiveStub } from '../tests/router-link-directive.stub';
import { SearcherComponent } from './searcher.component';

describe('SearcherComponent', () => {
  let component: SearcherComponent;
  let fixture: ComponentFixture<SearcherComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const activatedRoute = new ActivatedRouteStub();
  const library = new LibraryServiceSpy();

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule],
        declarations: [SearcherComponent, IsbnValidatorDirective],
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
    fixture = TestBed.createComponent(SearcherComponent);
    component = fixture.componentInstance;
    component.optionsChecked = [];
    component.options = ['title', 'author', 'isbn', 'gender'];
    component.disabled = {
      author: false,
      gender: false,
      isbn: false,
      title: false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update options selecting title', () => {
    const event = { currentTarget: { checked: true } };
    component.optionsChecked = [];
    component.updateOptions('title', event);
    expect(component.disabled.author).toBe(true);
    expect(component.disabled.gender).toBe(true);
    expect(component.disabled.isbn).toBe(true);
    expect(component.disabled.title).toBe(false);
    expect(component.optionsChecked).toEqual(['title']);
  });

  it('should update options selecting isbn', () => {
    const event = { currentTarget: { checked: true } };
    component.optionsChecked = [];
    component.updateOptions('isbn', event);
    expect(component.disabled.author).toBe(true);
    expect(component.disabled.gender).toBe(true);
    expect(component.disabled.isbn).toBe(false);
    expect(component.disabled.title).toBe(true);
    expect(component.optionsChecked).toEqual(['isbn']);
  });

  it('should update options selecting gender', () => {
    const event = { currentTarget: { checked: true } };
    component.optionsChecked = [];
    component.updateOptions('gender', event);
    expect(component.disabled.author).toBe(false);
    expect(component.disabled.gender).toBe(false);
    expect(component.disabled.isbn).toBe(true);
    expect(component.disabled.title).toBe(true);
    expect(component.optionsChecked).toEqual(['gender']);
  });

  it('should update options deelecting gender, selected author', () => {
    const event = { currentTarget: { checked: false } };
    component.optionsChecked = ['gender', 'author'];
    component.disabled.author = false;
    component.disabled.gender = false;
    component.disabled.isbn = true;
    component.disabled.title = true;

    component.updateOptions('gender', event);
    expect(component.disabled.author).toBe(false);
    expect(component.disabled.gender).toBe(false);
    expect(component.disabled.isbn).toBe(true);
    expect(component.disabled.title).toBe(true);
    expect(component.optionsChecked).toEqual(['author']);
  });
});
