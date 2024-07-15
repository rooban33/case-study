import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpaddComponent } from './cpadd.component';

describe('CpaddComponent', () => {
  let component: CpaddComponent;
  let fixture: ComponentFixture<CpaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpaddComponent]
    });
    fixture = TestBed.createComponent(CpaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
