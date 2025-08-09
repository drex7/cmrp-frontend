import {Component, effect, inject, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {cn, ghPhoneValidator, matchPasswordValidator, strongPasswordValidator} from '@/lib/utils';
import {NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {Button, ButtonDirective} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputMask} from 'primeng/inputmask';
import {AuthService} from "../../services/auth-service/auth-service";

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
    protected formType = signal<"login" | "signup">("login")
    protected minLengthValidator = Validators.minLength(5);
    protected readonly cn = cn;

    protected authService = inject(AuthService);


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
        // if (this.authForm.valid) {
        //     console.log("Form values: ", this.authForm)
        // } else {
        //     console.error("Form is not valid")
        // }

        if (this.formType() === 'signup') {
            try {
                const signup = await this.authService.signUp(this.authForm.value);
                console.log(signup);

            } catch (err) {

            }
        } else {

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
