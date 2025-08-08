import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const strongPasswordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasMinLength;

    return passwordValid ? null : {
      strongPassword: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar,
        hasMinLength
      }
    };
  };
}


export const ghPhoneValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    const ghPhoneRegex = /^(024|054|055|059|020|050|026|056|027|057)\d{7}$/;

    if (!value) return null;

    return ghPhoneRegex.test(value)
      ? null
      : {invalidGhanaPhone: true};
  };
}
