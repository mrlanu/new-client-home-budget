import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {environment} from '../../../environments/environment';
import {UiService} from '../../services/ui.service';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  loggedUser = environment.loggedUser;
  componentSubs: Subscription[] = [];

  imageSrc: any = '';

  constructor(private utilityService: UtilityService,
              private authService: AuthService,
              private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.uiService.isUserProfileImageChanged
      .subscribe(result => {
      this.imageSrc = 'data:image/jpeg;base64,' + result;
    }));
    this.uiService.downloadProfileImage();
    /*this.componentSubs.push(this.utilityService.getRandomUser()
      .subscribe(res => {
        this.randomUser = res;
      }));*/
  }

  onOpenSidebar() {
    $('#sidebar').toggleClass('active');
    $('#overlay').toggleClass('shadow');
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
