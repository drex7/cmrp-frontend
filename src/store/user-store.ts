import {UserInterface} from '@/interfaces/user-interface';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from '@angular/core';
import {AuthService} from '../app/services/auth-service/auth-service';
import {getUserAndAuthData} from '@/lib/utils';

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
  withComputed((store) => ({
    isUserSignedIn: computed(() => store.isSignedIn),
    loading: computed(() => store.isLoading),
    userData: computed(() => store.user),
    authData: computed(() => store.auth),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    async fetchUserInfo() {
      patchState(store, {isLoading: true});
      const {auth, user} = await authService.fetchAuthAndCurrentUser();
      localStorage.setItem('isSignedIn', JSON.stringify(true));
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
  })),
  withHooks({
    onInit(store) {
      getUserAndAuthData().then(({user}) => {
          patchState(store, {user})
        }
      )
    }
  })
)

