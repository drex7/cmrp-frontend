import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {UserCard} from '@/pages/dashboard-layout/users/user-card/user-card';
import {ghanaRegions, userFilters, userRoles, userTableHeaders} from '@/constants/index';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {cn, ghPhoneValidator} from '@/lib/utils';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {TitleCasePipe} from '@angular/common';
import {AuthFormInterface, RegionOrCityOption} from '@/interfaces/user-interface';
import {AuthService} from '../../../services/auth-service/auth-service';
import {MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {UsersService} from '../../../services/users/users-service';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'cmrp-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserCard,
    IconField,
    InputIcon,
    InputText,
    Select,
    FormsModule,
    Button,
    TableModule,
    ButtonDirective,
    Dialog,
    FloatLabel,
    InputMask,
    ReactiveFormsModule,
    TitleCasePipe,
    ConfirmDialog,
    Skeleton
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  protected showAddUserModal = false;
  protected selectedGroup = {
    label: "All Users",
    value: "all"
  }

  protected usersService = inject(UsersService)
  protected authService = inject(AuthService)
  protected messageService = inject(MessageService);
  protected regions: RegionOrCityOption[] = []
  protected cities: RegionOrCityOption[] = []
  protected readonly cn = cn;
  protected searchValue = ""
  protected readonly userTableHeaders = userTableHeaders;
  protected readonly userRoles = userRoles;
  protected readonly userFilters = userFilters;
  protected minLengthValidator = Validators.minLength(5);
  protected isSubmitting = signal(false);
  protected isFetchingUsers = signal(false);
  protected users = signal<Partial<AuthFormInterface>[]>([]);
  protected readonly userSummaryCards = signal<{
    title: string;
    count: number;
  }[]>([])

  protected userForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, this.minLengthValidator]),
    email: new FormControl("", [Validators.required, Validators.email]),
    telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
    role: new FormControl("", [Validators.required]),
    region: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
  });
  protected userFormControls = signal<string[]>(Object.keys(this.userForm.controls));
  protected readonly Array = Array;
  protected tableSkeletonArray = Array.from({length: 7}).map((_, i) => `Item #${i}`) as unknown as Partial<AuthFormInterface>[];

  ngOnInit() {
    this.isFetchingUsers.set(true)
    this.usersService.fetchUsers().subscribe({
      next: value => {
        this.isFetchingUsers.set(false)
        this.userSummaryCards.set([
          {title: 'administrators', count: value.counts.admin},
          {title: 'city officials', count: value.counts.city_official},
          {title: 'citizens', count: value.counts.citizens},
        ])
        this.users.set(value.users.map(user => {
          return {
            ...user,
            user_id: user.user_id?.slice(0, 8),
            role: user.role === "CityOfficial" ? "City Official" : user.role,
            telephone: user.telephone ? user.telephone.replace(/^\+233/, '0') : '-',
          }
        }))
      }
    })

    this.regions = ghanaRegions.map(r => ({label: r.label, value: r.value}));

    // update cities when region changes
    this.userForm.get('region')?.valueChanges.subscribe(regionValue => {
      if (!regionValue) {
        this.cities = [];
        return;
      }
      const region = ghanaRegions.find(r => r.value === regionValue);
      this.cities = region ? region.cities : [];
      this.userForm.get('city')?.reset();
    });
  }


  protected getUsers() {
    let users = this.selectedGroup.value === 'all'
      ? this.users()
      : this.users().filter(user => user.role === this.selectedGroup.value);

    if (this.searchValue.trim() !== "") {
      const search = this.searchValue.toLowerCase();
      users = users.filter(user => String(user.name).toLowerCase().includes(search));
    }
    return users;
  }

  protected getInputType(key: string): string {
    const types: { [key: string]: string } = {
      email: 'email',
      password: 'password',
      confirm_password: 'password',
      telephone: 'tel',
      name: 'text',
      region: 'text',
      city: 'text'
    };
    return types[key] || 'text';
  }

  protected cancelOnboardUserOperation() {
    this.isSubmitting.set(false)
    this.showAddUserModal = false;
    this.userForm.reset();
  }

  protected onSubmit() {
    this.isSubmitting.set(true)
    if (this.userForm.valid) {
      this.authService.onboardUser(this.userForm.value)
        .subscribe({
          next: (value) => {
            console.log(value);
            this.isSubmitting.set(false);
            this.showAddUserModal = false;
            this.userForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: value.message || 'User onboarded successfully'
            });
          },
          error: error => {
            this.isSubmitting.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Failed to onboard user'
            });
            console.error('Error onboarding user:', error);
          }
        })
    }

  }
}
