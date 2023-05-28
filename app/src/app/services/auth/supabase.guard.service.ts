import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SupabaseService } from '@services/auth/supabase.service';
import { AuthSession } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
class SupabaseGuardService {
  session = this.supabase.session;

  constructor(private router: Router, readonly supabase: SupabaseService) {}

  async getSession(): Promise<AuthSession | null> {
    return await this.supabase.session;
  }

  async canActivate(): Promise<boolean> {
    if (await this.supabase.sessionIsValid()) return true;
    await this.supabase.signOut();
    return false;
  }
}

export const activeSupabase: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(SupabaseGuardService).canActivate();
};

export const supabaseSessionResolver: ResolveFn<AuthSession | null> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(SupabaseGuardService).getSession();
};
