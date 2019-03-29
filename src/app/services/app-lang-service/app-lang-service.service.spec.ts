import { TestBed } from '@angular/core/testing';

import { AppLangServiceService } from './app-lang-service.service';

describe('AppLangServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppLangServiceService = TestBed.get(AppLangServiceService);
    expect(service).toBeTruthy();
  });
});
