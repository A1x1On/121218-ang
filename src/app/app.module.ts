import { BrowserModule           } from '@angular/platform-browser';
import { FormsModule             } from '@angular/forms';
import { HttpClientModule        } from '@angular/common/http';
import { NgModule                } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToasterModule           } from 'angular2-toaster';
import { NgBusyModule            } from 'ng-busy';
import { ModalModule             } from 'ngx-bootstrap/modal';

import { AppGlobal               } from './app.global';

import { AppEnter                } from './common/app.enter';
import { AccountGuard            } from './common/account.guard';

import { HttpErrorHandlerService } from './common/http-error-handler.service';

import { AppComponent            } from './app.component';
import { AuthComponent           } from './components/auth/auth.component';
import { TransactionsComponent   } from './components/transactions/transactions.component';
import { ProfileComponent        } from './components/profile/profile.component';
import { ErrorComponent          } from './components/error/error.component';

import { AccountService          } from './services/account.service';

import { routing                 } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TransactionsComponent,
    ProfileComponent,
    ErrorComponent
  ],
  imports: [
    routing,
    FormsModule,
    HttpClientModule,
    NgBusyModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AppGlobal,
    AccountService,
    AppEnter,
    AccountGuard,
    HttpErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
