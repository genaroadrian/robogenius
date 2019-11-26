import { TestBed } from '@angular/core/testing';

import { ModuloescuelasService } from './moduloescuelas.service';

describe('ModuloescuelasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuloescuelasService = TestBed.get(ModuloescuelasService);
    expect(service).toBeTruthy();
  });
});
