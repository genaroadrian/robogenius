import { TestBed } from '@angular/core/testing';

import { HomefclasesService } from './homefclases.service';

describe('HomefclasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomefclasesService = TestBed.get(HomefclasesService);
    expect(service).toBeTruthy();
  });
});
