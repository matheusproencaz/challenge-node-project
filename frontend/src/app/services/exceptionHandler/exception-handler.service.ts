import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  public errorsToSend: Observable<string[][]>;

  constructor() { }
    
  public handleError(error: any){

    if(error?.status === 400){
      alert(error.error.message);
      return throwError(() => {});
    }
    
    let errMsg: string = error?.error?.message;
    alert(error.error.message);
    return throwError(() => new Error(errMsg));
   }
}
