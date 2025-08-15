import {Component} from '@angular/core';
import {UserCard} from '@/pages/dashboard-layout/users/user-card/user-card';
import {usersTableData, userSummaryCards, userTableHeaders} from '@/constants/index';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'cmrp-users',
  imports: [
    UserCard,
    IconField,
    InputIcon,
    InputText,
    Select,
    FormsModule,
    Button,
    TableModule,
    Tooltip
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  protected readonly userSummaryCards = userSummaryCards;

  protected selectedGroup = {
    name: "All Users",
    code: "all"
  }

  protected searchValue = ""


  protected filters = [
    {name: 'All Users', code: 'all'},
    {name: 'Administrators', code: 'administrator'},
    {name: 'City Officials', code: 'city official'},
    {name: 'Citizens', code: 'citizen'},
  ];
  protected readonly userTableHeaders = userTableHeaders;
  protected readonly usersTableData = usersTableData

  protected getUsers() {
    let users = this.selectedGroup.code === 'all'
      ? this.usersTableData
      : this.usersTableData.filter(user => user.role === this.selectedGroup.code);

    if (this.searchValue.trim() !== "") {
      const search = this.searchValue.toLowerCase();
      users = users.filter(user => user.name.toLowerCase().includes(search));
    }

    return users;
  }

  protected removeUser(userId: string) {

  }

}
