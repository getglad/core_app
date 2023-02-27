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

  constructor() {}

  ngOnInit() {}
}
