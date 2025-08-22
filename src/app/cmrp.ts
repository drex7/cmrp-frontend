import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.css'
})
export class Cmrp implements OnInit {
  protected router = inject(Router)


  ngOnInit() {
    this.router.navigate(["dashboard"]).then(() => null);
  }
}
