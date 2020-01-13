import { TestBed } from '@angular/core/testing';

import { PmembresiaService } from './pmembresia.service';

describe('PmembresiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmembresiaService = TestBed.get(PmembresiaService);
    expect(service).toBeTruthy();
  });
});
