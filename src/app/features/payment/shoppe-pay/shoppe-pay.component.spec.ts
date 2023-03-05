import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppePayComponent } from './shoppe-pay.component';

describe('ShoppePayComponent', () => {
  let component: ShoppePayComponent;
  let fixture: ComponentFixture<ShoppePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppePayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
