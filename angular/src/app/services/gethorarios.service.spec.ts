import { TestBed } from '@angular/core/testing';

import { GethorariosService } from './gethorarios.service';

describe('GethorariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GethorariosService = TestBed.get(GethorariosService);
    expect(service).toBeTruthy();
  });
});
