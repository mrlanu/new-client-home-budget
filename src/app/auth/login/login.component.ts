import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
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
  dynamicOpacity = 0;

  constructor(/*private authService: AuthService, private uiService: UiService*/) { }

  ngOnInit() {
    /*this.transition(0);
    this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));
    this.loginForm = new FormGroup({
      username: new FormControl('',
        {validators: [Validators.required]}),
      password: new FormControl('',
        {validators: [Validators.required]})
    });*/
  }

  transition(counter: number) {
    if (counter < 10) {
      setTimeout(() => {
        counter++;
        this.dynamicOpacity += 0.1;
        this.transition(counter);
      }, 100);
    }
  }

  onRegister() {
    // this.uiService.isLoginChanged.next(false);
  }

  onSubmit() {
    /*this.isLoading = true;
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });*/
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
