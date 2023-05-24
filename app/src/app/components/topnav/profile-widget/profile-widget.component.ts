import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '@services/auth/supabase.service';

@Component({
  standalone: true,
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.scss'],
})
export class ProfileWidgetComponent implements OnInit {
  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {}

  async signOut() {
    await this.supabase.signOut();
  }
}
