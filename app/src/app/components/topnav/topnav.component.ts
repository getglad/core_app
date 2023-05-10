import { Component, Input, OnInit } from '@angular/core';
import { DesktopNavComponent } from './desktopnav/desktopnav.component';
import { MobileNavComponent } from './mobilenav/mobilenav.component';
import { MobileNavToggleComponent } from './mobilenavtoggle/mobilenavtoggle.component';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';

@Component({
  standalone: true,
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  imports: [
    ProfileWidgetComponent,
    MobileNavComponent,
    MobileNavToggleComponent,
    DesktopNavComponent,
  ],
})
export class TopnavComponent implements OnInit {
  @Input()
  name!: string;

  block: string = 'block';
  blockOpen: string = 'hidden';
  collapseOpen: string = 'max-h-0 invisible';

  constructor() {}

  ngOnInit() {}

  setCollapseOpen(value: string) {
    this.collapseOpen = value;
  }
}
