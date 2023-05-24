import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SupabaseService } from '@services/auth/supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
class SupabaseGuardService {
  session = this.supabase.session;

  constructor(private router: Router, readonly supabase: SupabaseService) {}

  async getSession(): Promise<Session | null> {
    return await this.supabase.session;
  }

  async canActivate(): Promise<boolean> {
    if (await this.supabase.sessionIsValid()) return true;
    this.supabase.signOut();
    return false;
  }
}

export const activeSupabase: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(SupabaseGuardService).canActivate();
};

export const supabaseSessionResolver: ResolveFn<Session | null> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(SupabaseGuardService).getSession();
};
