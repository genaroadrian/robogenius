import { TestBed } from '@angular/core/testing';

import { TipomensualidadService } from './tipomensualidad.service';

describe('TipomensualidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipomensualidadService = TestBed.get(TipomensualidadService);
    expect(service).toBeTruthy();
  });
});
