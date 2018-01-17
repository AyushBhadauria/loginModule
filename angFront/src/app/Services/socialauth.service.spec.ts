import { TestBed, inject } from '@angular/core/testing';

import { SocialAuth } from './socialauth.service';

describe('SocialauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialAuth]
    });
  });

  it('should be created', inject([SocialAuth], (service: SocialAuth) => {
    expect(service).toBeTruthy();
  }));
});
