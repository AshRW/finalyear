import { TestBed } from '@angular/core/testing';

import { FireserService } from './fireser.service';

describe('FireserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireserService = TestBed.get(FireserService);
    expect(service).toBeTruthy();
  });
});
