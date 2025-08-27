import {Component, input} from '@angular/core';
import {cn} from '@/lib/utils';

@Component({
  selector: 'cmrp-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  public userSummary = input<{
    title: string;
    count: number
  }>({
    title: "citizens",
    count: 0
  })
  protected readonly cn = cn;
}
