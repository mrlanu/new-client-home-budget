import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UiService {

  constructor(private httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  isLoadingChanged = new Subject<boolean>();
  isLoginChanged = new Subject<boolean>();
  isShowBudgetSelectChanged = new Subject<boolean>();
  isSummaryTransactionsChange = new Subject<boolean>();
  isUserProfileImageChanged = new Subject<string>();

  downloadProfileImage() {
    const url = `${this.baseUrl}/image/download`;
    this.httpClient.get(url, { responseType: 'text' })
      .subscribe((result: string) => {
        this.isUserProfileImageChanged.next(result);
      });
  }

  uploadProfileImage(data) {
    const url = `${this.baseUrl}/image/upload`;
    return this.httpClient.post<any>(url, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            let progress = Math.round(100 * event.loaded / event.total);
            if (progress >= 100) { progress = 100; }
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            this.downloadProfileImage();
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
}
