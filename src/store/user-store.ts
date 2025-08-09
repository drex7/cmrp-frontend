import {UserInterface} from '@/interfaces/user-interface';
import {signalStore, withState} from '@ngrx/signals';

const initialState: UserInterface = {
  city: "Accra",
  region: "Greater Accra",
  email: "sample@sample.com",
  firstName: "Sample",
  lastName: "User",
  middleName: "",
  username: "sample_user",
  telephone: "0241234567",
  isAuthenticated: false,
  isLoading: false,
}

export const UserStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
)
