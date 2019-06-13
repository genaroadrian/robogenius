import { TestBed } from '@angular/core/testing';

import { TipopagoService } from './tipopago.service';

describe('TipopagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipopagoService = TestBed.get(TipopagoService);
    expect(service).toBeTruthy();
  });
});
