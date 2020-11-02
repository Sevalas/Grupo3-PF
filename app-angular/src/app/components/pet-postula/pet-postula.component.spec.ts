import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetPostulaComponent } from './pet-postula.component';

describe('PetPostulaComponent', () => {
  let component: PetPostulaComponent;
  let fixture: ComponentFixture<PetPostulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetPostulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPostulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
