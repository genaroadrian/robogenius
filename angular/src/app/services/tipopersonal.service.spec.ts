import { TestBed } from '@angular/core/testing';

import { TipopersonalService } from './tipopersonal.service';

describe('TipopersonalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipopersonalService = TestBed.get(TipopersonalService);
    expect(service).toBeTruthy();
  });
});
