import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MobileSideMenuComponent } from './mobilemenu/mobilemenu.component';

@Component({
  standalone: true,
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  imports: [IonicModule, MobileSideMenuComponent],
})
export class SidemenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
