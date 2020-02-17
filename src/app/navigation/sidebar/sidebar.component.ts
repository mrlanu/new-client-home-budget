import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  baseUrl = environment.baseUrl;
  loggedUser = environment.loggedUser;
  profileImageSrc = '';
  componentSubs: Subscription[] = [];
  // randomUser: {name: string, image: string} = {name: '', image: ''};

  constructor(private utilityService: UtilityService,
              private authService: AuthService) { }

  ngOnInit() {
    this.profileImageSrc = `${this.baseUrl}/${this.loggedUser.username}/image/download`;
    /*this.componentSubs.push(this.utilityService.getRandomUser()
      .subscribe(res => {
        this.randomUser = res;
      }));*/
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
