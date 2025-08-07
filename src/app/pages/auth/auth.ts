import {Component} from '@angular/core';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'cmrp-auth',
  imports: [
    Card,
    FloatLabel,
    InputText
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

}
