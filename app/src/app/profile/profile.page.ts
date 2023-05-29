import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Profile, SupabaseService } from '@services/auth/supabase.service';
import { AuthSession } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loading = false;
  profile!: Profile;
  session!: AuthSession;

  updateProfileForm = this.formBuilder.group({
    username: '',
    website: '',
    avatar_url: '',
  });

  constructor(
    private readonly supabase: SupabaseService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.data.subscribe((data) => {
      this.session = data['session'];
    });

    await this.getProfile();

    const { username, website, avatar_url } = this.profile;
    this.updateProfileForm.patchValue({
      username,
      website,
      avatar_url,
    });
  }

  async getProfile() {
    try {
      this.loading = true;
      const session = await this.supabase.session;
      console.log(this.session);
      if (!session) {
        throw new Error('There is no session');
      }
      this.session = session;
      const { user } = this.session;
      if (!user) {
        throw new Error('You must be logged in to get your profile');
      }
      let { data: profile, error, status } = await this.supabase.profile(user);

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(): Promise<void> {
    try {
      this.loading = true;
      const user = this.session?.user;
      if (!user) {
        throw new Error('You must be logged in to update your profile');
      }

      const username = this.updateProfileForm.value.username as string;
      const website = this.updateProfileForm.value.website as string;
      const avatar_url = this.updateProfileForm.value.avatar_url as string;

      const { error } = await this.supabase.updateProfile({
        id: user.id,
        username,
        website,
        avatar_url,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    await this.supabase.signOut();
  }
}
