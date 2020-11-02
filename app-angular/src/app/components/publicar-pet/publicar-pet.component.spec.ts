import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarPetComponent } from './publicar-pet.component';

describe('PublicarPetComponent', () => {
  let component: PublicarPetComponent;
  let fixture: ComponentFixture<PublicarPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
