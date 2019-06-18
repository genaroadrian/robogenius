import { TestBed } from '@angular/core/testing';

import { TipomembresiaService } from './tipomembresia.service';

describe('TipomembresiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipomembresiaService = TestBed.get(TipomembresiaService);
    expect(service).toBeTruthy();
  });
});
