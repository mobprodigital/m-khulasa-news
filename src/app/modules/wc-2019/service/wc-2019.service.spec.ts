import { TestBed } from '@angular/core/testing';

import { Wc2019Service } from './wc-2019.service';

describe('Wc2019Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Wc2019Service = TestBed.get(Wc2019Service);
    expect(service).toBeTruthy();
  });
});
