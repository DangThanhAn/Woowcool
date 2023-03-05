import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoMoComponent } from './mo-mo.component';

describe('MoMoComponent', () => {
  let component: MoMoComponent;
  let fixture: ComponentFixture<MoMoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoMoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoMoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
