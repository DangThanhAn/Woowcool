import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCoolmateComponent } from './about-coolmate.component';

describe('AboutCoolmateComponent', () => {
  let component: AboutCoolmateComponent;
  let fixture: ComponentFixture<AboutCoolmateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutCoolmateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutCoolmateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
