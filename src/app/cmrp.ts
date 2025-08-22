import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.css'
})
export class Cmrp {

}
