import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DebtPayoffService} from '../../../services/debt-payoff.service';
import {DebtModel} from '../../../models/debt.model';

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
        }, 200);
      }));
    this.componentSubs.push(this.debtPayoffService.debtSelected
      .subscribe((debt: DebtModel) => {
        if (debt) {
          this.debtForm.patchValue({
            id: debt.id,
            name: debt.name,
            startBalance: debt.startBalance,
            minimumPayment: debt.minimumPayment,
            apr: debt.apr
          });
        } else {
          this.debtForm.patchValue({
            id: null,
            name: '',
            startBalance: 0,
            currentBalance: 0,
            minimumPayment: 0,
            nextPaymentDue: new Date(),
            apr: 0,
            paymentsList: []
          });
        }
    }));
  }

  initForm() {
    this.debtForm = new FormGroup({
      id: new FormControl(),
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
    this.debtForm.patchValue({currentBalance: this.debtForm.value.startBalance});
    if (this.debtForm.value.id) {
      this.debtPayoffService.editDebt(this.debtForm.value);
    } else {
      this.debtPayoffService.createDebt(this.debtForm.value);
    }
  }

  ngOnDestroy(): void {
    console.log('Destroyed');
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
