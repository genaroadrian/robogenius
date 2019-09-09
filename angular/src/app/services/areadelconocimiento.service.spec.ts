import { TestBed } from '@angular/core/testing';

import { AreadelconocimientoService } from './areadelconocimiento.service';

describe('AreadelconocimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreadelconocimientoService = TestBed.get(AreadelconocimientoService);
    expect(service).toBeTruthy();
  });
});
