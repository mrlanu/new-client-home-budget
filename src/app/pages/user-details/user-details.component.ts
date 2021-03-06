import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UtilityService} from '../../services/utility.service';
import {Subject} from 'rxjs';
import {UiService} from '../../services/ui.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  form: FormGroup;
  error = '';
  uploadResponse = { status: '', message: '', filePath: '' };
  files: File[] = [];
  filesChanged = new Subject<File[]>();

  constructor(private formBuilder: FormBuilder,
              private utilityService: UtilityService,
              private uiService: UiService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
    this.filesChanged.subscribe((files: File[]) => {
      this.files = files;
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.filesChanged.next(this.files);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.files[0]);

    this.uiService.uploadProfileImage(formData).subscribe(
      (res) => {
        if (res) {
          this.uploadResponse = res;
        }
      },
      (err) => this.error = err
    );
  }

}
