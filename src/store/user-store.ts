import {UserInterface} from '@/interfaces/user-interface';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {AuthService} from '../app/services/auth-service/auth-service';

const isSignedIn = localStorage.getItem('isSignedIn') !== null;


const initialState: UserInterface = {
  user: {
    userId: "",
    name: "",
    email: "",
    telephone: "",
    city: "",
    region: "",
    role: "Citizen",
  },
  isSignedIn,
  isLoading: false,
  auth: {}
}

export const UserStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    async fetchUserInfo() {
      patchState(store, {isLoading: true});
      const {authSession, currentUser} = await authService.fetchAuthAndCurrentUser();
      localStorage.setItem('isSignedIn', JSON.stringify(true));
      const userInfo = authSession?.tokens?.idToken?.payload;
      const user = {
        userId: currentUser.userId ?? "",
        name: userInfo?.["name"] ?? "",
        email: userInfo?.["email"] ?? "",
        telephone: userInfo?.["email"] ?? "",
        region: userInfo?.["custom:region"] ?? "",
        city: userInfo?.["custom:city"] ?? "",
        role: Array.isArray(userInfo?.["cognito:groups"])
          ? userInfo["cognito:groups"][0] ?? "Citizen"
          : "Citizen",
      } as UserInterface["user"]
      patchState(store, {isLoading: false, user});
    },

    signOut() {
      authService.signOut().then(() => {
        const user = {
          userId: "",
          name: "",
          email: "",
          telephone: "",
          city: "",
          region: "",
          role: "Citizen",
        } as UserInterface["user"]
        patchState(store, {isLoading: false, isSignedIn: false, user});
      });
    }
  }))
)

