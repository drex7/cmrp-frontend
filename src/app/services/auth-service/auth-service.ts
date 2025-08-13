import {inject, Injectable} from '@angular/core';
import {
  confirmSignUp as awsConfirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  signIn as awsSignIn,
  signOut as awsSignOut,
  signUp as awsSignUp,
  SignUpInput,
} from "aws-amplify/auth"
import {AuthFormInterface} from '@/interfaces/user-interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected router = inject(Router)

  public async signUp(data: AuthFormInterface) {
    const user: SignUpInput = {
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          name: data.name,
          'custom:region': data.region,
          'custom:city': data.city,
        }
      }
    }
    return await awsSignUp(user)
  }

  public async signIn(data: AuthFormInterface) {
    const user = {
      username: data.email,
      password: data.password,
    }
    return await awsSignIn(user)
  }

  public async confirmSignUp(username: string, confirmationCode: string) {
    console.log(`Confirm signing up for ${username}: ${confirmationCode}`)

    return await awsConfirmSignUp({
      username,
      confirmationCode
    })
  }

  public async fetchAuthAndCurrentUser() {
    const res = await Promise.all([
      this.getAuthSession(),
      this.getCurrentUser()
    ]);

    console.log(res)
    console.log(res[0])
    console.log(res[1])
  }

  public async signOut() {
    localStorage.clear()
    await awsSignOut()
    return Promise.all([await awsSignOut(),
      await this.router.navigate([""])
    ])
  }

  private async getAuthSession() {
    return await fetchAuthSession()
  }

  private async getCurrentUser() {
    return await getCurrentUser();
  }
}
