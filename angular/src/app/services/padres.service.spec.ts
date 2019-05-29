import { TestBed } from '@angular/core/testing';

import { PadresService } from './padres.service';

describe('PadresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PadresService = TestBed.get(PadresService);
    expect(service).toBeTruthy();
  });
});
