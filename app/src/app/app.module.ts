import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from '@components/account/account.component';
import { AuthComponent } from '@components/auth/auth.component';
import { SidemenuComponent } from '@components/sidemenu/sidemenu.component';
import { TopnavComponent } from '@components/topnav/topnav.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, AccountComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SidemenuComponent,
    TopnavComponent,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
