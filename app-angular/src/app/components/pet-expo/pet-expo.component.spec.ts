import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetExpoComponent } from './pet-expo.component';

describe('PetExpoComponent', () => {
  let component: PetExpoComponent;
  let fixture: ComponentFixture<PetExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetExpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetExpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
