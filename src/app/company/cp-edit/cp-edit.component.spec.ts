import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpEditComponent } from './cp-edit.component';

describe('CpEditComponent', () => {
  let component: CpEditComponent;
  let fixture: ComponentFixture<CpEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpEditComponent]
    });
    fixture = TestBed.createComponent(CpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
