import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { TopnavComponent } from '@components/topnav/topnav.component';
import { TextInputComponent } from '~/ui/text-input/text-input.component';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    TopnavComponent,
    TextInputComponent,
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
