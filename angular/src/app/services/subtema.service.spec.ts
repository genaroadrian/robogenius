import { TestBed } from '@angular/core/testing';

import { SubtemaService } from './subtema.service';

describe('SubtemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubtemaService = TestBed.get(SubtemaService);
    expect(service).toBeTruthy();
  });
});
