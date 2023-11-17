import { TestBed } from '@angular/core/testing';

import { CapacitorpreferencesService } from './capacitorpreferences.service';

describe('CapacitorpreferencesService', () => {
  let service: CapacitorpreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorpreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
