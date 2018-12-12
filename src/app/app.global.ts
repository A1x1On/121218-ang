import { Injectable, OnInit    } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ToasterConfig         } from 'angular2-toaster';

import { Account               } from './models/account';

@Injectable()
export class AppGlobal {
  static CONFIG = {};

  config: any     = {
    ...AppGlobal.CONFIG,

    toaster: new ToasterConfig({
      showCloseButton   : false,
      tapToDismiss      : true,
      timeout           : 5000,
      animation         : 'fade',
      positionClass     : 'toast-bottom-right',
      mouseoverTimerStop: true
    })
  };

  session  : Account = null;

  constructor() {
  }

  reqError(e) {
    return e.error != null && e.error != undefined ? e.error : 'Sorry, something went wrong: ' + e.statusText;
  }


}
