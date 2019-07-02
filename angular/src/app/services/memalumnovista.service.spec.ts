import { TestBed } from '@angular/core/testing';

import { MemalumnovistaService } from './memalumnovista.service';

describe('MemalumnovistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemalumnovistaService = TestBed.get(MemalumnovistaService);
    expect(service).toBeTruthy();
  });
});
