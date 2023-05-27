import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@services/auth/supabase.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  session: Session | null = null;

  constructor(
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.session = data['session'];
    });
  }
}
