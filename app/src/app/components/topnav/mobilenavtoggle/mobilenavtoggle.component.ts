import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-mobile-nav-toggle',
  templateUrl: './mobilenavtoggle.component.html',
  styleUrls: ['./mobilenavtoggle.component.scss'],
})
export class MobileNavToggleComponent implements OnInit {
  block: string = 'block';
  blockOpen: string = 'hidden';
  collapseOpen: string = 'max-h-0 invisible';

  @Output() collapseOpenEmit = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  openMenu() {
    if (this.collapseOpen == 'max-h-0 invisible') {
      this.collapseOpen = 'max-h-96 visible';
      this.block = 'hidden';
      this.blockOpen = 'block';
    } else {
      this.collapseOpen = 'max-h-0 invisible';
      this.block = 'block';
      this.blockOpen = 'hidden';
    }
    this.collapseOpenEmit.emit(this.collapseOpen);
  }
}
