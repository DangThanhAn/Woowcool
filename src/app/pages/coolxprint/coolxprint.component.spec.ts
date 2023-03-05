import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoolxprintComponent } from './coolxprint.component';

describe('CoolxprintComponent', () => {
  let component: CoolxprintComponent;
  let fixture: ComponentFixture<CoolxprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoolxprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoolxprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
