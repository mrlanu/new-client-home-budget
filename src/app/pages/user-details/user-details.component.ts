import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtilityService} from '../../services/utility.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  form: FormGroup;
  error = '';
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.utilityService.uploadProfileImage(formData).subscribe(
      (res) => {
        if (res) {
        this.uploadResponse = res;
        }
      },
      (err) => this.error = err
    );
  }

}
