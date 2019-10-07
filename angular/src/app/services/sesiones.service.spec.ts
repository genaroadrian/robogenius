import { TestBed } from '@angular/core/testing';

import { SesionesService } from './sesiones.service';

describe('SesionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SesionesService = TestBed.get(SesionesService);
    expect(service).toBeTruthy();
  });
});
