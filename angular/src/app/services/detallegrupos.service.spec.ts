import { TestBed } from '@angular/core/testing';

import { DetallegruposService } from './detallegrupos.service';

describe('DetallegruposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallegruposService = TestBed.get(DetallegruposService);
    expect(service).toBeTruthy();
  });
});
