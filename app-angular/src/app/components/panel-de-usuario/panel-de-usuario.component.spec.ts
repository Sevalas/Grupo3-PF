import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDeUsuarioComponent } from './panel-de-usuario.component';

describe('PanelDeUsuarioComponent', () => {
  let component: PanelDeUsuarioComponent;
  let fixture: ComponentFixture<PanelDeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDeUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
