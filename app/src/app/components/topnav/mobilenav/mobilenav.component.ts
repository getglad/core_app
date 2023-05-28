import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SupabaseService } from '@services/auth/supabase.service';

@Component({
  standalone: true,
  selector: 'app-mobile-nav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.scss'],
  imports: [RouterLink, RouterLinkActive],
})
export class MobileNavComponent implements OnInit {
  @Input()
  collapseOpen!: string;

  constructor(private readonly supabase: SupabaseService) {}

  ngOnInit() {}

  async signOut() {
    await this.supabase.signOut();
  }
}
