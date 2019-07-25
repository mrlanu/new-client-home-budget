import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../services/utility.service';
import {Category} from '../../models/category.model';

export interface TypeOfCategory {
  value: number;
  name: string;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Input()action: string;
  @Input()typeOf: string;
  @Output()categoryCreated = new EventEmitter<number>();
  addCategoryForm: FormGroup;
  componentSubs: Subscription[] = [];

  types: TypeOfCategory[] = [
    {value: 0, name: 'EXPENSE'},
    {value: 1, name: 'INCOME'}
  ];

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addCategoryForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      type: new FormControl(this.typeOf === 'EXPENSE' ? 0 : 1)
    });
  }

  onSubmit() {
    this.componentSubs.push(this.utilityService.createCategory(this.addCategoryForm.value)
      .subscribe((category: Category) => {
        console.log(category);
        this.utilityService.getAllCategories();
        this.categoryCreated.emit(category.id);
        this.addCategoryForm.reset({type: this.typeOf === 'EXPENSE' ? 1 : 0});
        this.ngOnDestroy();
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
