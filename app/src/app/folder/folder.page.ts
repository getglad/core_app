import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@services/auth/supabase.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  session = this.supabase.session;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
