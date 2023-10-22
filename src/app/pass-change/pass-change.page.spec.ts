import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassChangePage } from './pass-change.page';

describe('PassChangePage', () => {
  let component: PassChangePage;
  let fixture: ComponentFixture<PassChangePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PassChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
