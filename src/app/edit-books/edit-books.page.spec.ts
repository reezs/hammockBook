import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBooksPage } from './edit-books.page';

describe('EditBooksPage', () => {
  let component: EditBooksPage;
  let fixture: ComponentFixture<EditBooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBooksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
