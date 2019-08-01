import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UtilityService} from '../../../services/utility.service';
import {Subcategory} from '../../../models/subcategory.model';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit, OnDestroy {
  @Input()categoryId: number;
  @Output()subcategoryCreated = new EventEmitter<number>();
  addCategoryForm: FormGroup;
  componentSubs: Subscription[] = [];

  constructor(private utilityService: UtilityService) { }

  ngOnInit() {
    this.initForm();

    this.componentSubs.push(this.utilityService.subcategoryCreated
      .subscribe((subc: Subcategory) => {
        this.subcategoryCreated.emit(subc.id);
        this.addCategoryForm.reset();
        this.ngOnDestroy();
    }));
  }

  initForm() {
    this.addCategoryForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    });
  }

  onSubmit() {
      this.utilityService.createSubcategory(this.categoryId, this.addCategoryForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
