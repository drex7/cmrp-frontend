import {Injectable} from '@angular/core';
import {signIn as awsSignIn, signUp as awsSignUp} from "aws-amplify/auth"
import {AuthFormInterface} from '@/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public async signUp(data: AuthFormInterface) {
    console.log(data)
    const user = {
      username: data.email,
      password: data.password,
      attributes: {
        phone_number: data.telephone,
        'custom:city': data.city,
        'custom:region': data.region
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
}
