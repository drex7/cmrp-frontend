import {Injectable} from '@angular/core';
import {signIn as awsSignIn, signUp as awsSignUp, SignUpInput} from "aws-amplify/auth"
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
          name: data.name
        }
      }
    }
    console.log(user)
    return await awsSignUp(user)
  }

  public async signIn(data: AuthFormInterface) {
    const user = {
      username: data.email,
      password: data.password,
    }
    return await awsSignIn(user)
  }
}
