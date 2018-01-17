import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

declare const FB:any;

@Injectable()
export class SocialAuth {

  constructor(private http: AuthHttp) {
    FB.init({
      appId      : '123307255013928',
      status     : false, 
      xfbml      : false, 
      version    : 'v2.8' 
    });
  }
  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.http.post(`http://localhost:3000/login/facebook`, {access_token: result.authResponse.accessToken})
              .toPromise()
              .then(response => {
                var token = response.headers.get('x-auth-token');
                if (token) {
                  localStorage.setItem('id_token', token);
                }
                resolve(response.json());
              })
              .catch(() => reject());
        } else {
          reject();
        }
      }, {scope: 'public_profile,email'})
    });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`http://localhost:3000/profile`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}