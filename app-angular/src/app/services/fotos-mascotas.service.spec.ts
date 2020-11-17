import { TestBed } from '@angular/core/testing';

import { FotosMascotasService } from './fotos-mascotas.service';

describe('FotosMascotasService', () => {
  let service: FotosMascotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosMascotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
