import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilityService} from '../../../services/utility.service';
import {Account} from '../../../models/account.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit, OnDestroy {

  addAccForm: FormGroup;
  currencies: string[] = ['USD'];
  componentSubs: Subscription[] = [];
  @Output() accCreated = new EventEmitter<number>();

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.initForm();

    this.componentSubs.push(this.utilityService.accountCreated
      .subscribe((acc: Account) => {
        this.accCreated.emit(acc.id);
        this.addAccForm.reset({currency: 'USD', includeInTotal: true, initialBalance: 0});
        this.ngOnDestroy();
      }));
  }

  initForm() {
    this.addAccForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      currency: new FormControl('USD'),
      initialBalance: new FormControl(0),
      includeInTotal: new FormControl(true)
    });
  }

  onSubmit() {
    this.utilityService.createAccount(this.addAccForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
