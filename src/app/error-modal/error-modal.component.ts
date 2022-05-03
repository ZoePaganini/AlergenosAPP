import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  @Input() error: string = 'No se ha introducido un código de hotel.'
}