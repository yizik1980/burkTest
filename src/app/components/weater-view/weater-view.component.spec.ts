import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaterViewComponent } from './weater-view.component';

describe('WeaterViewComponent', () => {
  let component: WeaterViewComponent;
  let fixture: ComponentFixture<WeaterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaterViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
