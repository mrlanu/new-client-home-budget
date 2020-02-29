import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DebtPayoffService} from '../../../services/debt-payoff.service';

@Component({
  selector: 'app-edit-debt',
  templateUrl: './edit-debt.component.html',
  styleUrls: ['./edit-debt.component.css']
})
export class EditDebtComponent implements OnInit, OnDestroy {

  debtForm: FormGroup;
  componentSubs: Subscription[] = [];

  constructor(private debtPayoffService: DebtPayoffService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.debtPayoffService.debtCreated
      .subscribe(() => {
        // added for fix form reset and close modal
        setTimeout(() => {
          this.debtForm.reset();
          this.ngOnDestroy();
        }, 200);
      }));
  }

  initForm() {
    this.debtForm = new FormGroup({
      publicId: new FormControl(),
      name: new FormControl(),
      startBalance: new FormControl(),
      currentBalance: new FormControl(),
      minimumPayment: new FormControl(),
      nextPaymentDue: new FormControl(new Date()),
      apr: new FormControl(),
      paymentsList: new FormControl([])
    });
  }

  onSubmit() {
    this.debtForm.patchValue({publicId: 'test3', currentBalance: this.debtForm.value.startBalance});
    this.debtPayoffService.createDebt(this.debtForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
