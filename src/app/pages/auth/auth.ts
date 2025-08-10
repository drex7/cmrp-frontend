import {Component, effect, inject, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cn, ghPhoneValidator, matchPasswordValidator, strongPasswordValidator} from '@/lib/utils';
import {NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputMask} from 'primeng/inputmask';
import {AuthService} from "../../services/auth-service/auth-service";
import {ToastService} from "../../services/toast-service/toast-service";

@Component({
    selector: 'cmrp-auth',
    imports: [
        Card,
        FloatLabel,
        InputText,
        ReactiveFormsModule,
        TitleCasePipe,
        Password,
        InputMask,
        NgTemplateOutlet,
        Button
    ],
    templateUrl: './auth.html',
    styleUrl: './auth.css'
})
export class Auth {
    protected authForm: FormGroup;
    protected authFormControls = signal<string[]>([]);
    protected isSubmitting = signal(false);
    protected formType = signal<"login" | "signup">("login")
    protected minLengthValidator = Validators.minLength(5);
    protected readonly cn = cn;

    protected authService = inject(AuthService);
    protected toastService = inject(ToastService);

    constructor() {
        this.authForm = this.createLoginForm()
        effect(() => {
            if (this.formType()) {
                this.authForm = this.formType() === "login" ? this.createLoginForm() : this.createSignUpForm()
                this.authFormControls.set(Object.keys(this.authForm.controls))
            }
        });

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

    protected async onSubmit() {
        this.isSubmitting.set(true);
        if (this.authForm.valid) {
            if (this.formType() === 'signup') {
                await this.signUp()
            } else {
                await this.signIn()
            }
        }

    }

    private async signIn() {
        try {
            const signIn = await this.authService.signIn(this.authForm.value);
            console.log(signIn);
        } catch (err) {
            const error = err as Error;
            this.toastService.showToast("error", "Login failed", error.message);
            this.isSubmitting.set(false);
        }
    }

    private async signUp() {
        try {
            const signup = await this.authService.signUp(this.authForm.value);
            console.log(signup);
        } catch (err) {
            const error = err as Error;
            this.toastService.showToast("error", "Login failed", error.message);
            this.isSubmitting.set(false);
            this.isSubmitting.set(false);

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
                telephone: new FormControl("", [Validators.required, ghPhoneValidator()]),
                password: new FormControl("", [Validators.required, strongPasswordValidator()]),
                confirm_password: new FormControl("", [Validators.required, strongPasswordValidator()]),
                region: new FormControl("", [Validators.required, this.minLengthValidator]),
                city: new FormControl("", [Validators.required, this.minLengthValidator]),
            },
            {
                validators: [matchPasswordValidator('password', 'confirm_password')]
            }
        )
    }
}
