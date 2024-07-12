import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdisplayComponent } from './cmdisplay.component';

describe('CmdisplayComponent', () => {
  let component: CmdisplayComponent;
  let fixture: ComponentFixture<CmdisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmdisplayComponent]
    });
    fixture = TestBed.createComponent(CmdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
