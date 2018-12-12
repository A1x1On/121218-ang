import { Injectable              } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router                  } from '@angular/router';
import { Observable              } from 'rxjs/Observable';

import { AppGlobal               } from '../app.global';
import { AccountService          } from '../services/account.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private accountService : AccountService,
    private router         : Router,
    private app            : AppGlobal) {
  }

  canActivate(
    next  : ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let logged = this.accountService.checkLogged();

    if(logged){

      if(!localStorage.getItem('session')){
        this.setSession();
      }else{
        this.app.session = this.accountService._decode();
      }

      return logged;
    }else{
      this.router.navigate(['']);
      return logged
    }
  }

  setSession(){
    this.accountService.getUser().subscribe((response) => response);
  }
}
