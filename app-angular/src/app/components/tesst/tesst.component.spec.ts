import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesstComponent } from './tesst.component';

describe('TesstComponent', () => {
  let component: TesstComponent;
  let fixture: ComponentFixture<TesstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
