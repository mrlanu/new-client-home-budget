import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Brief} from '../models/brief';

@Injectable()
export class SummariesService {

  baseUrl = environment.baseUrl;

  briefChanged = new Subject<Brief>();

  constructor(private httpClient: HttpClient) { }

  getBrief() {
    const url = `${this.baseUrl}/summaries/brief`;
    this.httpClient.get<Brief>(url)
      .subscribe(brief => {
        this.briefChanged.next(brief);
    });
  }
}
