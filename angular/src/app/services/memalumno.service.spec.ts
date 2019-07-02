import { TestBed } from '@angular/core/testing';

import { MemalumnoService } from './memalumno.service';

describe('MemalumnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemalumnoService = TestBed.get(MemalumnoService);
    expect(service).toBeTruthy();
  });
});
