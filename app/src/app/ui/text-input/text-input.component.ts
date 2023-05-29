import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class TextInputComponent implements OnInit {
  @Input()
  disabled: boolean = false;

  @Input()
  form!: FormGroup;

  @Input()
  formName!: string;

  @Input()
  placeholder!: string;

  @Input()
  type: string = 'text';

  @Input()
  value!: any;

  @Input()
  uiLabel!: string;

  constructor() {}

  ngOnInit() {}
}
