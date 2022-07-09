import { TestBed } from '@angular/core/testing';

import { AirlineManagementService } from './airline-management.service';

describe('AirlineManagementService', () => {
  let service: AirlineManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirlineManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
