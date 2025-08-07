import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.scss'
})
export class Cmrp {
  protected readonly title = signal('cmrp-frontend');
}
