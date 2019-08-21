import { TestBed } from '@angular/core/testing';

import { PersonalperfilService } from './personalperfil.service';

describe('PersonalperfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonalperfilService = TestBed.get(PersonalperfilService);
    expect(service).toBeTruthy();
  });
});
