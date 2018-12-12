import { Component, OnInit        } from '@angular/core';
import { Router                   } from '@angular/router';

import { ToasterService           } from 'angular2-toaster';
import { Subscription, Observable } from 'rxjs';
import * as _                       from 'underscore';

import { AppGlobal                } from '../../app.global';
import { AccountService           } from '../../services/account.service';

import { Account                  } from '../../models/account';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  username   : string;
  email      : string;
  password   : string;
  showSignup : boolean = false;
  busy       : Subscription;

  constructor(
    private accountService : AccountService,
    private toasterService : ToasterService,
    private router         : Router,
    public  app            : AppGlobal
  ) { }

  ngOnInit() {
  }

  auth() {
    if (this.email && this.password) {
      this.showSignup ? this.signup() : this.signin();
    } else {
      this.toasterService.pop('error', 'Log in', (this.email ? 'Enter your password.' : 'Enter login email'));
    }

    return false;
  }

  signin(){
    this.busy = this.accountService.signin({
        email     : this.email,
        password  : this.password
      })
      .subscribe(
        (r) => {
          this.toasterService.pop('success', 'Log in', 'Congrats! You\'re in.');
          this.router.navigate(['/transactions']);
        },
        e  => this.toasterService.pop('error', 'Log in', e.error == null ? 'Wrong email or password' : this.app.reqError(e))
      )
    ;
  }

  signup() {
    this.busy = this.accountService.signup({
        username  : this.username,
        email     : this.email,
        password  : this.password
      })
      .subscribe(
        (r) => {
          this.toasterService.pop('success', 'Sign up', 'Congrats! You\'re registered!');
          this.router.navigate(['/transactions']);
        },
        e  => this.toasterService.pop('error', 'Sign up', e.error == null ? 'Wrong email or password' : this.app.reqError(e))
      )
    ;
  }

}
