import { TestBed } from '@angular/core/testing';

import { AsistenciasService } from './asistencias.service';

describe('AsistenciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenciasService = TestBed.get(AsistenciasService);
    expect(service).toBeTruthy();
  });
});
