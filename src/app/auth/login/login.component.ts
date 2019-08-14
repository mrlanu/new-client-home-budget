import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {UiService} from '../../services/ui.service';
/*import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.loginForm = new FormGroup({
      username: new FormControl('demo',
        {validators: [Validators.required]}),
      password: new FormControl('demo',
        {validators: [Validators.required]})
    });
  }

  onRegister() {
    this.uiService.isLoginChanged.next(false);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
