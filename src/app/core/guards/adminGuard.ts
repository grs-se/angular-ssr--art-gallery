import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { map } from 'rxjs/operators';

export const adminGuard = () => {
  const accountService = inject(AccountService);
  const router = inject(Router);

  return accountService.isAdmin$.pipe(
    map(admin => {
      if (admin) return true;
      else {
        router.navigate(['/'], { queryParams: { returnUrl: router.url } });
        return false;
      }
    })
  );
};
