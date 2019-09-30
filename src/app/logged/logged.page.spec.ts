import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPage } from './logged.page';

describe('LoggedPage', () => {
  let component: LoggedPage;
  let fixture: ComponentFixture<LoggedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
