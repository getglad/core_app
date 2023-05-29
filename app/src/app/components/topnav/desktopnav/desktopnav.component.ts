import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-desktop-nav',
  templateUrl: './desktopnav.component.html',
  styleUrls: ['./desktopnav.component.scss'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class DesktopNavComponent implements OnInit {
  @Input()
  appPages!: { title: string; url: string }[];

  constructor() {}

  ngOnInit() {}
}
