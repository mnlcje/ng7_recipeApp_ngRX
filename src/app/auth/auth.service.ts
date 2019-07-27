import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }
  

@Injectable({providedIn:'root'})
export class AuthService
{  
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;

    constructor(private httpC : HttpClient){}

    signUp(email:string , password:string)
    {
       return this.httpC.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBN0ny45fI_n-jGRQICsUFxGw-5KGACaek',
            {
                email: email,
                password: password,
                returnSecureToken: true 
            }
          )
          .pipe
           (
             catchError(this.handleError),
             tap(resData => {
               this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
               );
             })
           )
       }   

       login(email : string, password : string)
       {
         return this.httpC.post<AuthResponseData>
         (
           'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBN0ny45fI_n-jGRQICsUFxGw-5KGACaek',
           {
            email: email,
            password: password,
            returnSecureToken: true
           }           
        )
        .pipe
        (
          catchError (this.handleError),
          tap(resData => {
            this.handleAuthentication(
             resData.email,
             resData.localId,
             resData.idToken,
             +resData.expiresIn
            );
          })
        )
      }

      logout()
      {
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
        {
          clearTimeout(this.tokenExpirationTimer);
        }  
        this.tokenExpirationTimer = null;          
      }
      
      autoLogin()
      {
        const userData : {
           email: string;
           id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData)
        {
          return;
        }

        const loadedUser = new User (
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );  
        
        if(loadedUser.token){
          this.user.next(loadedUser);
          const expirationDuration = 
          new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          console.log(expirationDuration);
          this.autoLogOut(expirationDuration);
        }
      }

      autoLogOut(expirationDuration : number)      
      {        
        this.tokenExpirationTimer =  setTimeout ( () => {
          this.logout();
          },expirationDuration
        );
      }

      private handleError(errorRes : HttpErrorResponse)
      {
        let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
          }
        switch (errorRes.error.error.message) {
           case 'EMAIL_EXISTS':
             errorMessage = 'This email exists already';
             break;
           case 'EMAIL_NOT_FOUND':
               errorMessage = 'This email does not exist.';
               break;
           case 'INVALID_PASSWORD':
               errorMessage = 'This password is not correct.';
               break;
          }
        return throwError(errorMessage);
      }

      private handleAuthentication(emailId : string, userId : string, token : string, 
                                    expiresIn : number
                                  )
      {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000);
        const user = new User(emailId,userId,token,expirationDate); 
        this.user.next(user);    
        localStorage.setItem('userData',JSON.stringify(user));          
      }

}