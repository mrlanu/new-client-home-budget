import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
/*import {AuthService} from '../auth.service';
import {UiService} from '../../shared/ui.service';*/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  componentSubs: Subscription[] = [];
  isLoading = false;
  dynamicOpacity = 0;

  constructor(/*private authService: AuthService, private uiService: UiService*/) { }

  transition(counter: number) {
    if (counter < 10) {
      setTimeout(() => {
        counter++;
        this.dynamicOpacity += 0.1;
        this.transition(counter);
      }, 100);
    }
  }

  onSubmit() {
    /*this.isLoading = true;
    this.authService.registerUser({
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password
    });*/
  }

  ngOnInit() {
    /*this.transition(0);
    this.componentSubs.push(this.uiService.isLoadingChanged.subscribe(result => {
      this.isLoading = result;
    }));
    this.signUpForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    });*/
  }

  onLogin() {
    // this.uiService.isLoginChanged.next(true);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
