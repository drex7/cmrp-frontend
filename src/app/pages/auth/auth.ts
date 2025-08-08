import {Component, effect, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cn, ghPhoneValidator, strongPasswordValidator} from '@/lib/utils';
import {TitleCasePipe} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'cmrp-auth',
  imports: [
    Card,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    TitleCasePipe,
    ButtonDirective,
    Password,
    InputMask
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  protected authForm: FormGroup;
  protected authFormControls = signal<string[]>([]);
  protected formType = signal<"login" | "signup">("signup")
  protected minLengthValidator = Validators.minLength(5);
  protected readonly cn = cn;


  constructor() {
    this.authForm = this.formType() === "login" ? this.createLoginForm() : this.createSignUpForm()
    effect(() => {
      if (this.formType()) {

        this.authFormControls.set(Object.keys(this.authForm.controls))
      }
    });
  }

  protected getInputType(key: string): string {
    const types: { [key: string]: string } = {
      email: 'email',
      password: 'password',
      telephone: 'tel',
      name: 'text',
      region: 'text',
      city: 'text'
    };
    return types[key] || 'text';
  }

  protected onSubmit() {
    if (this.authForm.valid) {
      console.log("Form values: ", this.authForm)
    } else {
      console.error("Form is not valid")
    }
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
      password: new FormControl("", [Validators.required, strongPasswordValidator()]),
      region: new FormControl("", [Validators.required, this.minLengthValidator]),
      city: new FormControl("", [Validators.required, this.minLengthValidator]),
      telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
    })
  }
}
