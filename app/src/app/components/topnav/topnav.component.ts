import { Component, Input, OnInit } from '@angular/core';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';

@Component({
  standalone: true,
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  imports: [ProfileWidgetComponent],
})
export class TopnavComponent implements OnInit {
  @Input()
  name!: string;

  block: string = 'block';
  blockOpen: string = 'hidden';
  collapseOpen: string = 'max-h-0 invisible';
  openPadding: string = '';

  constructor() {}

  ngOnInit() {}

  openMenu() {
    console.log('fire');
    if (this.collapseOpen == 'max-h-0 invisible') {
      this.collapseOpen = 'max-h-96 visible';
      this.openPadding = 'pb-3';
      this.block = 'hidden';
      this.blockOpen = 'block';
    } else {
      this.collapseOpen = 'max-h-0 invisible';
      this.openPadding = '';
      this.block = 'block';
      this.blockOpen = 'hidden';
    }
  }
}
