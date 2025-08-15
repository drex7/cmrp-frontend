import {UserInterface} from '@/interfaces/user-interface';
import {signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {AuthService} from '../app/services/auth-service/auth-service';

const initialState: UserInterface = {
  user: {
    city: "",
    region: "",
    name: "",
    email: "",
    telephone: "",
    role: "admin",
    isSignedIn: false,
  },
  isLoading: false,
  auth: {}
}

export const UserStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    async fetchUserInfo() {
      const {authSession, currentUser} = await authService.fetchAuthAndCurrentUser();
      console.log(currentUser);
      console.log(authSession);
      const userInfo = authSession?.tokens?.idToken?.payload;
      console.log(userInfo)
    }
  }))
)
