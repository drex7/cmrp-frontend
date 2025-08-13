import {UserInterface} from '@/interfaces/user-interface';
import {signalStore, withState} from '@ngrx/signals';

const initialState: UserInterface = {
  user: {
    city: "Accra",
    region: "Greater Accra",
    name: "Sample user",
    password: "123456",
    email: "sample@sample.com",
    telephone: "0241234567",
    role: "admin",
    isSignedIn: true,
  },
  isLoading: false,
}

export const UserStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
)
