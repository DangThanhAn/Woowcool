import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaloPayComponent } from './zalo-pay.component';

describe('ZaloPayComponent', () => {
  let component: ZaloPayComponent;
  let fixture: ComponentFixture<ZaloPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaloPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaloPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
