import { Component, OnInit, ViewChild               } from '@angular/core';

import { Subscription, Observable                   } from 'rxjs';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToasterService                             } from 'angular2-toaster';

import { AccountService                             } from '../../services/account.service';
import { Transaction                                } from '../../models/transaction';

import { AppGlobal                                  } from '../../app.global';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  @ViewChild('createModal') createModal : ModalDirective;

  transactions      : Transaction[] = [];
  busyTransactions  : Subscription;
  busyCreation      : Subscription;
  transactParams    : any;

  constructor(
    private accountService : AccountService,
    private toasterService : ToasterService,
    public  app            : AppGlobal
  ) {
  }

  ngOnInit() {
    this.reset();
    this.getTransactions();
  }

  reset(){
    this.transactParams = {
      name   : '',
      amount : 0
    };
  }

  getTransactions(){
    this.busyTransactions = this.accountService.getTransactions().subscribe(
      (transaction) => {
        this.transactions = transaction;
        return transaction
      },
      (e) => this.toasterService.pop('error', 'Create Transaction', this.app.reqError(e)));
  }

  // create transaction
  openCreation(){
    this.createModal.show();
  }

  create(){
    this.busyCreation = this.accountService.createTransaction(this.transactParams).subscribe(
      (response)=> {
        this.getTransactions();
        this.createModal.hide();
        this.toasterService.pop('success', 'Create Transaction', 'successful');
        return response
      },
      (e) => this.toasterService.pop('error', 'Create Transaction', this.app.reqError(e)));
  }
  // ----------------

}
