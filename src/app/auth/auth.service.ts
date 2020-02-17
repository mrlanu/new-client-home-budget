import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {UserInfo} from './user-info.model';
import {UiService} from '../services/ui.service';

@Injectable()
export class AuthService {

  baseUrl = environment.baseUrl;
  userChange = new Subject<UserInfo>();
  private isAuthenticated = false;
  loggedUser: UserInfo;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private uiService: UiService) {}

  static saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('tokenExpireDate', expireDate.toString());
    console.log('Obtained Access token');
  }

  registerUser(authData: AuthData) {
    this.httpClient.post(this.baseUrl + '/signup', authData).subscribe(user => {
      this.uiService.isLoadingChanged.next(false);
      // this.uiService.openSnackBar('Register successfully, please Login', null, 5000);
      this.uiService.isLoginChanged.next(true);
    }, err => {
      // this.uiService.openSnackBar(err.error.message, null, 5000);
      this.uiService.isLoadingChanged.next(false);
    });
  }

  getToken(authData: AuthData) {

    const params = new URLSearchParams();
    params.append('username', authData.username);
    params.append('password', authData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'my-trusted-client');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      })
    };

    this.httpClient.post(this.baseUrl + '/oauth/token', params.toString(), httpOptions)
      .subscribe(token => {
        AuthService.saveToken(token);
        this.authSuccessfully();
      }, err => {
        // this.uiService.openSnackBar('Invalid username or password', null, 5000);
        this.uiService.isLoadingChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this.getToken(authData);
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/welcome-page']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccessfully() {
    this.uiService.isLoadingChanged.next(false);
    this.isAuthenticated = true;
    this.uiService.isShowBudgetSelectChanged.next(true);
    // this.uiService.openSnackBar('Logging successfully, please select your Budget', null, 5000);
  }


  getLoggedInUser() {
    this.httpClient.get<UserInfo>(this.baseUrl + '/user')
      .subscribe((user) => {
        this.loggedUser = user;
        environment.loggedUser = user;
      this.userChange.next(user);
    });
  }
}
