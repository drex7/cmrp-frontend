import {inject, Injectable} from '@angular/core';
import {
  confirmSignUp as awsConfirmSignUp,
  signIn as awsSignIn,
  signOut as awsSignOut,
  signUp as awsSignUp,
  SignUpInput,
} from "aws-amplify/auth"
import {AuthFormInterface} from '@/interfaces/user-interface';
import {Router} from '@angular/router';
import {getUserAndAuthData} from '@/lib/utils';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected router = inject(Router)
  protected http = inject(HttpClient)

  public async signUp(data: AuthFormInterface) {

    const telephone = `+233${data.telephone.slice(1)}`
    const user: SignUpInput = {
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          email: data.email,
          name: data.name,
          phone_number: telephone,
          'custom:region': data.region,
          'custom:city': data.city,
        }
      }
    }
    return await awsSignUp(user)
  }

  public onboardUser(data: AuthFormInterface) {

    const telephone = `+233${data.telephone.slice(1)}`
    const user = {
      name: data.name,
      email: data.email,
      role: data.role,
      region: data.region,
      city: data.city,
      telephone,

    }
    return this.http.post(`${environment.baseUrl}/invite`, user)
  }

  public async signIn(data: AuthFormInterface) {
    const user = {
      username: data.email,
      password: data.password,
    }
    return await awsSignIn(user)
  }

  public async confirmSignUp(username: string, confirmationCode: string) {
    return await awsConfirmSignUp({
      username,
      confirmationCode
    })
  }

  public async fetchAuthAndCurrentUser() {
    const {user, auth} = await getUserAndAuthData()
    return {
      auth,
      user
    }
  }

  public async signOut() {
    localStorage.clear()
    return Promise.all([
      await awsSignOut(),
      await this.router.navigate([""])
    ])
  }

}
