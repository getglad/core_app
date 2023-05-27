import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccountComponent } from '@components/account/account.component';
import { SidemenuComponent } from '@components/sidemenu/sidemenu.component';
import { TopnavComponent } from '@components/topnav/topnav.component';
import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MainPageRoutingModule,
    SidemenuComponent,
    TopnavComponent,
    AccountComponent,
  ],
  declarations: [MainPage],
})
export class MainPageModule {}
