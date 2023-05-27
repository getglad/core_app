import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { SupabaseService } from '@services/auth/supabase.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  session: Session | null = null;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private readonly supabase: SupabaseService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.supabase.authChanges(async (_, session) => {
      if (await this.supabase.sessionIsValid()) {
        this.session = session;
        this.router.navigate(['/main']);
      } else {
        this.session = null;
        this.router.navigate(['/login']);
      }
    });
  }

  initializeApp(): void {
    App.addListener('appUrlOpen', (data) => {
      let params = new URLSearchParams(data['url']);
      let refreshToken = params.get('refresh_token');
      let accessToken = params.get('#access_token');

      this.ngZone.run(async () => {
        if (refreshToken && accessToken) {
          this.supabase.supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (await this.supabase.sessionIsValid()) {
            this.router.navigate(['/main']);
          } else {
            this.supabase.signOut();
          }
        } else {
          console.log('could not do a thing');
        }
      });
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
