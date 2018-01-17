import { TestBed, inject } from '@angular/core/testing';

import { AuthenService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenService]
    });
  });

  it('should be created', inject([AuthenService], (service: AuthenService) => {
    expect(service).toBeTruthy();
  }));
});
