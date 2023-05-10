import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-mobile-nav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.scss'],
})
export class MobileNavComponent implements OnInit {
  @Input()
  collapseOpen!: string;

  constructor() {}

  ngOnInit() {}
}
