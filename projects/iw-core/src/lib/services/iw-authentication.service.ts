import {throwError as observableThrowError, Observable} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Constants} from '../app/constants/app.constant';

@Injectable({providedIn: 'root'})
export class IwAuthenticationService {
  public user: any;
  public token: string;
  private userUrl = Constants.API_ENDPOINT + 'v1/user';

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem(Constants.CurrentUser));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    const postData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    console.log(postData);
    return this.http.post(Constants.API_ENDPOINT + 'v1/login?clientId=' + Constants.ClientId, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(
      map((response) => {
        console.log('=======token=====');
        // login successful if there's a jwt token in the response
        const loginResp: any | any = response;
        // console.log(token);
        if (loginResp.access_token) {
          // set token property
          this.token = loginResp.access_token;
          loginResp.loginSecond = new Date().getTime() / 1000;

          // if (loginResp.type !== Constants.USER.backend) {
          //     return false;
          // }
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(Constants.CurrentUser, JSON.stringify(loginResp));
          // return true to indicate successful login
          return true;
        } else {
          return false;
        }
      }), catchError(res => observableThrowError(res)),);
  }

  getToken() {
    const t: any = JSON.parse(localStorage.getItem(Constants.CurrentUser));
    if (t) {
      return t.access_token;
    }
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem(Constants.CurrentUser);
    localStorage.removeItem(Constants.CurrentUserInfo);
    this.http.post(Constants.API_ENDPOINT + 'v1/logout', null);

  }


  storeUserInfo(user: any) {
    localStorage.setItem(Constants.CurrentUserInfo, JSON.stringify(user));
  }

  getUserInfo() {
    let user: any = {};
    user = JSON.parse(localStorage.getItem(Constants.CurrentUserInfo));
    return user;
  }

}
