import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output('onClick') onClick: EventEmitter<string> = new EventEmitter();

  @Input() text: string = '';
  @Input() btnClass: string = '';
  //@Input() type: {} = {
  //  type: String,
  //  required: false,
  //  default: 'primary',
  //  validator(value: string) {
  //    return [
  //      'primary',
  //      'secondary',
  //      'tertiary',
  //      'alert-success',
  //      'alert-danger',
  //      'slideshow',
  //      'auth',
  //    ].includes(value);
  //  }
  //}

  emitEvent() {
    console.log('emitEvent');
    this.onClick.emit();
  }
}
