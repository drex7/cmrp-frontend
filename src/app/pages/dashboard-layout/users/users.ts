import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {AuthFormInterface, RegionOrCityOption} from '@/interfaces/user-interface';
import {AuthService} from '@/services/auth-service/auth-service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {UsersService} from '@/services/users/users-service';
import {Skeleton} from 'primeng/skeleton';
import {Subject, take, takeUntil} from 'rxjs';
import {Tooltip} from 'primeng/tooltip';

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
    Skeleton,
    Tooltip,
    NgOptimizedImage
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit, OnDestroy {

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
  protected tableSkeletonArray = Array.from({length: 8}).map((_, i) => `Item #${i}`) as unknown as Partial<AuthFormInterface>[];
  protected destroy$ = new Subject<void>();
  protected confirmationService = inject(ConfirmationService)

  ngOnInit() {
    if (this.users().length === 0) {
      this.fetchUsers()
    }

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

  ngOnDestroy() {
    console.log(this.users())
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected fetchUsers() {
    this.isFetchingUsers.set(true)
    this.usersService.fetchUsers().pipe(takeUntil(this.destroy$)).subscribe({
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
            telephone: user.phone_number ? user.phone_number.replace(/^\+233/, '0') : '-',
          }
        }))
      },
      error: error => {
        this.isFetchingUsers.set(false)
        const errorMessage = error.error?.message || 'Failed to fetch users';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    })
  }

  protected deleteUser(event: Event, user: string, username: string) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete ${user} ?`,
      header: 'Delete User',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.usersService.deleteUser(username).pipe(take(1)).subscribe({
          next: ({message}) => {
            this.fetchUsers()
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: message,
              life: 3000
            })
          },
          error: error => {
            const errorMessage = error.error?.message || 'unable to delete user';
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000
            });
          }
        })
      },

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
            this.fetchUsers();
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
