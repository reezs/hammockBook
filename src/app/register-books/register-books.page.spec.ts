import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBooksPage } from './register-books.page';

describe('RegisterBooksPage', () => {
  let component: RegisterBooksPage;
  let fixture: ComponentFixture<RegisterBooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBooksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
