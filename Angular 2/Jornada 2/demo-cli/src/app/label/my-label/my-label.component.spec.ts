/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyLabelComponent } from './my-label.component';

describe('MyLabelComponent', () => {
  let component: MyLabelComponent;
  let fixture: ComponentFixture<MyLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
