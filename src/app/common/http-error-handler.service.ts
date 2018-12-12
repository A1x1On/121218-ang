import { Injectable         } from '@angular/core';
import { HttpErrorResponse  } from '@angular/common/http';
import { ErrorObservable    } from 'rxjs/observable/ErrorObservable';
import { Observable, of     } from 'rxjs';
import                             'rxjs/add/operator/catch';
import                             'rxjs/add/observable/throw';

@Injectable()
export class HttpErrorHandlerService {
  constructor() {
  }

  handleError<T> (error: HttpErrorResponse, operation?: string, result = {} as T) {
    error['operation'] = operation;
    error['entity']    = result;
    return Observable.throw(error);
  }
}




