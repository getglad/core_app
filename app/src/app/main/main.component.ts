import { Component, NgZone, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { SupabaseService } from '@services/auth/supabase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  session = this.supabase.session;
  foo: string = 'bar';

  constructor(
    private ngZone: NgZone,
    private readonly supabase: SupabaseService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }

  initializeApp(): void {
    App.addListener('appUrlOpen', (data) => {
      let params = new URLSearchParams(data['url']);
      let refreshToken = params.get('refresh_token');
      let accessToken = params.get('#access_token');

      this.ngZone.run(() => {
        if (refreshToken && accessToken) {
          this.supabase.supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        } else {
          console.log('could not do a thing');
        }
      });
    });
  }
}
