import { ModuleWithProviders           } from '@angular/core';
import { Routes, RouterModule          } from '@angular/router';

import { AccountGuard                  } from './common/account.guard';
import { AppEnter                      } from './common/app.enter';

import { AuthComponent                 } from './components/auth/auth.component';
import { TransactionsComponent         } from './components/transactions/transactions.component';
import { ProfileComponent              } from './components/profile/profile.component';
import { ErrorComponent                } from './components/error/error.component';

const appRoutes: Routes = [
  {
    path                  : '',
    canActivate           : [AppEnter],
    component             : AuthComponent
  },
  {
    path                  : 'transactions',
    canActivate           : [AccountGuard, AppEnter],
    component             : TransactionsComponent
  },
  {
    path                  : 'profile',
    canActivate           : [AccountGuard, AppEnter],
    component             : ProfileComponent
  },
  {
    path                  : 'error',
    canActivate           : [AppEnter],
    component             : ErrorComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


