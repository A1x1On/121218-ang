import { Injectable                    } from '@angular/core';
import { HttpClient, HttpParams        } from '@angular/common/http';
import { HttpHeaders                   } from '@angular/common/http';
import { BehaviorSubject               } from 'rxjs/BehaviorSubject';
import { Observable, throwError        } from 'rxjs';
import { catchError, map, tap          } from 'rxjs/operators';

import * as moment                       from 'moment';
import * as _                            from 'underscore';
import { ToasterService                } from 'angular2-toaster';

import { HttpErrorHandlerService       } from '../common/http-error-handler.service';
import { AppGlobal                     } from '../app.global';

import { Account                       } from '../models/account';
import { Transaction                   } from '../models/transaction';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class AccountService {


  constructor(
    private http           : HttpClient,
    private httpError      : HttpErrorHandlerService,
    private toasterService : ToasterService,
    private app            : AppGlobal
  ) {
  }

  signin(criteria) {
    let body = new URLSearchParams();
    body.set('email'    , criteria.email);
    body.set('password' , criteria.password);

    return this.http.post<any>('http://193.124.114.46:3001/sessions/create', body.toString(), httpOptions)
      .pipe(
        tap((response) => {
          this.setToken(response);
          return response;
        }),
        catchError(err => this.httpError.handleError(err, 'signin', []))
      )
    ;
  }

  signup(criteria) {
    let body = new URLSearchParams();
    body.set('email'    , criteria.email);
    body.set('password' , criteria.password);
    body.set('username' , criteria.username);

    return this.http.post<any>('http://193.124.114.46:3001/users', body.toString(), httpOptions)
      .pipe(
        tap((response) => {
          this.setToken(response);
          return response;
        }),
        catchError(err => this.httpError.handleError(err, 'signup', []))
      )
    ;
  }

  private setToken(authResult) {
    localStorage.setItem('id_token', authResult.id_token);
  }

  checkLogged() {
    return !!localStorage.getItem('id_token');
  }

  getUser(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization  : `bearer ${localStorage.getItem('id_token')}`
      })
    };

    return this.http.get<any>('http://193.124.114.46:3001/api/protected/user-info', httpOptions)
      .pipe(
        tap((response : any) => {
          this.app.session = response.user_info_token as Account;
          return localStorage.setItem('session', JSON.stringify(response.user_info_token))
        }),
        catchError(err       => this.httpError.handleError(err, 'getUser', []))
      )
    ;
  }

  _encode(account: Account): void {
    localStorage.setItem('session', JSON.stringify(account));
    this.app.session = account;
  }

  _decode(): Account {
    try {
      return JSON.parse(localStorage.getItem('session') || null);
    } catch(e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('id_token');
    this.app.session = null;
  }

  getTransactions() : Observable<Transaction[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization  : `bearer ${localStorage.getItem('id_token')}`
      })
    };

    return this.http.get<Transaction[]>('http://193.124.114.46:3001/api/protected/transactions', httpOptions)
      .pipe(
        map((response : any) => response.trans_token),
        catchError(err => this.httpError.handleError(err, 'getTransactions', []))
      )
    ;
  }

  createTransaction(transactParams) : any{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization  : `bearer ${localStorage.getItem('id_token')}`
      })
    };

    let body = new URLSearchParams();
    body.set('name'  , transactParams.name);
    body.set('amount', transactParams.amount);

    return this.http.post<any>('http://193.124.114.46:3001/api/protected/transactions', body.toString(), httpOptions)
      .pipe(
        catchError(err => this.httpError.handleError(err, 'createTransaction', []))
      )
    ;
  }
}
