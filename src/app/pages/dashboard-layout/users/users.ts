import {Component} from '@angular/core';
import {UserCard} from '@/pages/dashboard-layout/users/user-card/user-card';
import {userSummaryCards} from '@/constants/index';

@Component({
  selector: 'cmrp-users',
  imports: [
    UserCard

  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  protected readonly userSummaryCards = userSummaryCards;
}
