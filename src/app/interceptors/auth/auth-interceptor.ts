import {HttpInterceptorFn} from '@angular/common/http';
import {UserStore} from '@/store/user-store';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore)
  const authToken = userStore.authData().idToken();
  const newReq = req.clone({
    headers: req.headers
      // .append("Authorization", `Bearer ${authToken}`)
      .append("Authorization", "Bearer eyJraWQiOiI4VnN3cjB6N0o2OHBvT1hvRlhkanRtMHJwVmkrUzQxMFZBUHZrZURkUVhnPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206cmVnaW9uIjoiV2VzdGVybiIsInN1YiI6IjQyNDVmNDM0LWMwMDEtNzBlNC0yZDhkLWU3NmJhYzg4YzFiMSIsImNvZ25pdG86Z3JvdXBzIjpbImFkbWluIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9rckxURG93Um0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNDI0NWY0MzQtYzAwMS03MGU0LTJkOGQtZTc2YmFjODhjMWIxIiwiY3VzdG9tOmNpdHkiOiJUYWtvcmFkaSIsIm9yaWdpbl9qdGkiOiIyZWI5NGQzYy1iMGI0LTQyMzEtYTU5Ni01OWQ1MTY1ZWJlYjciLCJhdWQiOiIxcDBmZTUxNzBrNGMwNjU0YzRvY2tqcmJ2NiIsImV2ZW50X2lkIjoiZDE2ZDgwZjctZDc1Zi00MDJhLTljZTktMzBhYWIxODlmNTUyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NTYyMjYwNjIsImV4cCI6MTc1NjIyOTY2MiwiaWF0IjoxNzU2MjI2MDYyLCJqdGkiOiJjMDdjZmVlMy1jYmM5LTQ3MTQtYmViNS1jNmM3MjA3MmNkODgiLCJlbWFpbCI6IjNzYW1rdXNAZ21haWwuY29tIn0.PmZxN-VNTRIT6hCF_U93hDvtwBhZuT_z5qB9LPu1MEF1sxMW8Lu5TeirZr93AvEsWuhc-NYHAWEQY2C_CTmpR85TsFn_UpdlqTS_kKSSU8FRpDeT133ZQvjMg-fC5jMKZO5uss_ipTrllXbbtqItJyrL8rRkS1JKNV08Qer0QXk94oLg8ia39ZMcvObCMz_ez7QMbKzcMrpORI6trau_LyFYVLXcwdik221QV7dvKZOB3aWZtN3bYXSdOJq71H9ANtfLRmh9LF1lZVM87kmvR3oAmeThqXrDjIdkobDWlcOz9wHVbNpDWziIxz8BMH4iS3syTpHZRVhejjZbMlHv-w")
      .append("Content-Type", "application/json"),
  })

  return next(newReq);
};
