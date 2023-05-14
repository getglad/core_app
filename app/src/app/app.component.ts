import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { SupabaseService } from '@services/auth/supabase.service';

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
  session = this.supabase.session;

  constructor(private readonly supabase: SupabaseService) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => (this.session = session));
  }

  initializeApp(): void {
    App.addListener('appUrlOpen', (data) => {
      console.log('App opened with URL:', data);

      let params = new URLSearchParams(data['url']);
      let refreshToken = params.get('refresh_token');
      let accessToken = params.get('#access_token');

      if (refreshToken && accessToken) {
        this.supabase.supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        this.supabase.authChanges((_, session) => (this.session = session));
      } else {
        console.log('could not do a thing');
      }
    });
  }
}
