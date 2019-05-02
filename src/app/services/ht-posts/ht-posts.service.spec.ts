import { TestBed } from '@angular/core/testing';

import { HtPostsService } from './ht-posts.service';

describe('HtPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HtPostsService = TestBed.get(HtPostsService);
    expect(service).toBeTruthy();
  });
});
