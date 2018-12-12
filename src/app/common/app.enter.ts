import { Injectable, Compiler                        } from '@angular/core';
import { Router, CanActivate                         } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable                                  } from 'rxjs/Observable';

import { AppGlobal                                   } from '../app.global';

declare var $: any;

@Injectable()
export class AppEnter implements CanActivate {
  constructor(private router : Router,
              private app    : AppGlobal) {
  }

  canActivate(
    next  : ActivatedRouteSnapshot,
    state : RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // light up active links
    setTimeout(function() {
      $('.nav-link')                     .removeClass('text-faint');
      $(`.nav-link[href='${state.url}']`).addClass('text-faint');
    } , 100);
    // ---------------------

    return true;
  }

}
