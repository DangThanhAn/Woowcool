import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisingComponent } from './rising.component';

describe('RisingComponent', () => {
  let component: RisingComponent;
  let fixture: ComponentFixture<RisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
