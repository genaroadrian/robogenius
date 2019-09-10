import { TestBed } from '@angular/core/testing';

import { CodigosService } from './codigos.service';

describe('CodigosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodigosService = TestBed.get(CodigosService);
    expect(service).toBeTruthy();
  });
});
