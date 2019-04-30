import { TestBed } from '@angular/core/testing';

import { EscuelasService } from './escuelas.service';

describe('EscuelasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscuelasService = TestBed.get(EscuelasService);
    expect(service).toBeTruthy();
  });
});
