import {ChangeDetectionStrategy, Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cn, ghPhoneValidator, matchPasswordValidator, strongPasswordValidator} from '@/lib/utils';
import {NgOptimizedImage, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputMask} from 'primeng/inputmask';
import {AuthService} from "@/services/auth-service/auth-service";
import {ToastService} from "@/services/toast-service/toast-service";
import {InputOtp} from "primeng/inputotp";
import {UserStore} from '@/store/user-store';
import {ghanaRegions} from '@/constants/index';
import {RegionOrCityOption} from '@/interfaces/user-interface';
import {Select} from 'primeng/select';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {AuthType} from '@/types/index';

@Component({
  selector: 'cmrp-auth',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    TitleCasePipe,
    Password,
    InputMask,
    NgTemplateOutlet,
    Button,
    InputOtp,
    Select,
    NgOptimizedImage,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnDestroy {
  protected authForm: FormGroup;
  protected authFormControls = signal<string[]>([]);
  protected isSubmitting = signal(false);
  protected formType = signal<AuthType>("login")
  protected minLengthValidator = Validators.minLength(5);
  protected readonly cn = cn;
  protected regions: RegionOrCityOption[] = []
  protected cities: RegionOrCityOption[] = []
  protected userStore = inject(UserStore)
  protected authService = inject(AuthService);
  protected toastService = inject(ToastService);
  protected messageService = inject(MessageService);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected destroy$ = new Subject<void>();
  private readonly formCreators: Record<string, () => FormGroup> = {
    login: () => this.createLoginForm(),
    signup: () => this.createSignUpForm(),
    otp: () => this.createOtpForm(),
    reset_password: () => this.createResetPasswordForm(),
  };

  constructor() {
    const titleMap: Record<string, AuthType> = {
      "Login": "login",
      "Reset Password": "reset_password",
      "Sign Up": "signup",
      "Verify OTP": "otp",
    };

    this.route.title
      .pipe(takeUntil(this.destroy$))
      .subscribe(title => {
        if (!title) return;
        const key = Object.keys(titleMap).find(k => title.endsWith(k));
        if (key) {
          this.formType.set(titleMap[key]);
        }
      });


    this.authForm = this.createLoginForm()
    this.regions = ghanaRegions.map(r => ({label: r.label, value: r.value}));
    effect(() => {
      if (this.formType()) {
        this.authForm = this.formCreators[this.formType()]?.()
        this.authFormControls.set(Object.keys(this.authForm.controls))
      }


      // update cities when region changes
      this.authForm.get('region')?.valueChanges.subscribe(regionValue => {
        const region = ghanaRegions.find(r => r.value === regionValue);
        console.log(region)
        this.cities = region ? region.cities : [];
        this.authForm.get('city')?.reset();
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getInputType(key: string): string {
    const types: { [key: string]: string } = {
      email: 'email',
      password: 'password',
      new_password: 'password',
      confirm_password: 'password',
      confirm_new_password: 'password',
      confirmation_code: 'text',
      telephone: 'tel',
      name: 'text',
      region: 'text',
      city: 'text'
    };
    return types[key] || 'text';
  }

  // Submit form data
  protected async onSubmit() {
    if (this.authForm.valid) {
      if (this.formType() === 'signup') {
        await this.signUp()
      } else if (this.formType() === 'login') {
        localStorage.setItem("email", this.authForm.value.email)
        await this.signIn()
      } else if (this.formType() === 'reset_password') {
        await this.resetPassword()
      } else {
        await this.confirmOtp()
      }
    }
  }

  protected async loginSignUp() {
    await this.router.navigate(this.formType() === 'signup' ? ['login'] : ['signup'])
  }

  private async resetPassword() {
    this.isSubmitting.set(true);
    const formValue = this.authForm.value;
    const {nextStep: {signInStep}} = await this.authService.resetPassword(formValue.new_password)

    if (signInStep === "DONE") {
      this.isSubmitting.set(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password reset successfully',
        life: 3000
      })

      this.userStore.signOut()
      await this.router.navigate(["login"])
    }
  }

  private async confirmOtp() {
    const formValue = this.authForm.value
    const username = localStorage.getItem("email") ?? "";
    const {isSignUpComplete} = await this.authService.confirmSignUp(username, formValue.otp)
    if (isSignUpComplete) {
      this.formType.set("login");
    }
  }

  private async signIn(): Promise<void> {
    this.isSubmitting.set(true);
    try {
      const {nextStep: {signInStep}} = await this.authService.signIn(this.authForm.value);
      await this.handleSignInStep(signInStep);
    } catch (error) {
      console.error(error);
      this.handleError(error as Error);
    }
  }

  private async handleSignInStep(signInStep: string): Promise<void> {
    this.isSubmitting.set(false);
    console.log(signInStep)

    if (signInStep === "DONE") {
      this.userStore.setIsSignedIn()
      await this.userStore.fetchUserInfo()
      await this.router.navigate(["dashboard"])
      return;
    }

    if (signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
      await this.router.navigate(['reset-password']);
      // this.formType.set("reset_password")
    }

    if (["CONFIRM_SIGN_UP", "CONFIRM_SIGN_IN"].includes(signInStep)) {
      await this.router.navigate(['verify-otp']);
      // this.formType.set("otp");
    }
  }

  private async signUp() {
    this.isSubmitting.set(true);
    try {
      const {nextStep: {signUpStep}} = await this.authService.signUp(this.authForm.value);
      this.isSubmitting.set(false);
      if (signUpStep === "CONFIRM_SIGN_UP") {
        await this.router.navigate(['verify-otp']);
        // this.formType.set("otp");
      }
      if (signUpStep === "DONE") {
        await this.signIn()
      }
    } catch (error) {
      this.handleError(error as Error, "Sign Up");

    }
  }

  private handleError(error: Error, type = "Login"): void {
    this.toastService.showToast("error", `${type} failed`, error.message);
    this.isSubmitting.set(false);
  }

  private createLoginForm() {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    })
  }

  private createSignUpForm() {
    return new FormGroup({
        name: new FormControl("", [Validators.required, this.minLengthValidator]),
        email: new FormControl("", [Validators.required, Validators.email]),
        telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
        password: new FormControl("", [Validators.required, strongPasswordValidator()]),
        confirm_password: new FormControl("", [Validators.required, strongPasswordValidator()]),
        region: new FormControl("", [Validators.required, this.minLengthValidator]),
        city: new FormControl("", [Validators.required, Validators.minLength(2)]),
      },
      {
        validators: [matchPasswordValidator('password', 'confirm_password')]
      }
    )
  }

  private createResetPasswordForm() {
    return new FormGroup({
      new_password: new FormControl("", [Validators.required, strongPasswordValidator()]),
      confirm_new_password: new FormControl("", [Validators.required, strongPasswordValidator()]),
    }, {
      validators: [matchPasswordValidator('new_password', 'confirm_new_password')]
    })
  }

  private createOtpForm() {
    return new FormGroup({
      otp: new FormControl("", [Validators.required, Validators.minLength(6)]),
    })
  }
}
