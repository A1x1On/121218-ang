import { Component, OnInit  } from '@angular/core';
import { Router             } from '@angular/router';

import { AccountService     } from './services/account.service';
import { AppGlobal          } from './app.global';

declare var $: any;

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private accountService : AccountService,
    private router         : Router,
    public  app            : AppGlobal
  ) {
  }

  ngOnInit() {
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['']);
  }

}
