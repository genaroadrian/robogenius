import { TestBed } from '@angular/core/testing';

import { SubareacService } from './subareac.service';

describe('SubareacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubareacService = TestBed.get(SubareacService);
    expect(service).toBeTruthy();
  });
});
