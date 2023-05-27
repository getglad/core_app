import { TestBed } from '@angular/core/testing';

import { SupabaseGuardService } from './supabase.guard.service';

describe('SupabaseGuardService', () => {
  let service: SupabaseGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
