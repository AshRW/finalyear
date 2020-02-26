import { TestBed } from '@angular/core/testing';

import { NoticeserService } from './noticeser.service';

describe('NoticeserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticeserService = TestBed.get(NoticeserService);
    expect(service).toBeTruthy();
  });
});
