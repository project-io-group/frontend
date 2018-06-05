///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, Input} from '@angular/core';
import { AlertService } from '../../services/UI_tools/alertService';

@Component({
  selector: 'ngx-email-widget',
  templateUrl: './email.widget.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class EmailWidgetComponent {

  @Input() subject: string;
  constructor(protected alertService: AlertService) {
  }
}
