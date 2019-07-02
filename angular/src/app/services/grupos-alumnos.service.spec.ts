import { TestBed } from '@angular/core/testing';

import { GruposAlumnosService } from './grupos-alumnos.service';

describe('GruposAlumnosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GruposAlumnosService = TestBed.get(GruposAlumnosService);
    expect(service).toBeTruthy();
  });
});
