import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { AccountComponent } from '@components/account/account.component';
import { AuthComponent } from '@components/auth/auth.component';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FolderPageRoutingModule,
  ],
  declarations: [AccountComponent, AuthComponent, FolderPage],
})
export class FolderPageModule {}
