import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  randomUser: {name: string, image: string} = {name: '', image: ''};
  componentSubs: Subscription[] = [];

  imageSrc: any = '';

  constructor(private utilityService: UtilityService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getImageFromService();
    /*this.componentSubs.push(this.utilityService.getRandomUser()
      .subscribe(res => {
        this.randomUser = res;
      }));*/
  }

  getImageFromService() {
    this.utilityService.downloadProfileImage().subscribe(response => {
      this.imageSrc = 'data:image/jpeg;base64,' + response;
    });
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
