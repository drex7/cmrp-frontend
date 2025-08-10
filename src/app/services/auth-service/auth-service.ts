import {Injectable} from '@angular/core';
import {
  confirmSignUp as awsConfirmSignUp,
  getCurrentUser,
  signIn as awsSignIn,
  signUp as awsSignUp,
  SignUpInput
} from "aws-amplify/auth"
import {AuthFormInterface} from '@/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  public async getAuthSession() {
    const currentUser = await getCurrentUser();
    // const session = await fetchAuthSession()
    // console.log(session)
    console.log(currentUser);
  }
}
