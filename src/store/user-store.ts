import {UserInterface} from '@/interfaces/user-interface';
import {signalStore, withState} from '@ngrx/signals';

const initialState: UserInterface = {
  city: "Accra",
  region: "Greater Accra",
  email: "sample@sample.com",
  name: "Sample user",
  username: "sample_user",
  isAuthenticated: false,
  isLoading: false,
}

export const UserStore = signalStore(
  withState(initialState),
)
