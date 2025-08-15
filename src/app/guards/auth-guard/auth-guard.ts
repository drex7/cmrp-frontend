import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '@/store/user-store';

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  const router = inject(Router);
  const userStore = inject(UserStore)
  const user = userStore.userData()

  const route = childRoute.routeConfig?.path ?? ""

  if (route === "") return true
  if (route === "my-incidents" && user().role === "Citizen") return true
  if (["incidents", "users"].includes(route) && ["Admin", "CityOfficial"].includes(user().role)) {
    return true
  }


  await router.navigate(['']);
  return false;
};
