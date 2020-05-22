import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import{ AuthObject } from '../interfaces';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'npv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  subscription: Subscription;
  auth: AuthObject;

  authUrl = environment.authUrl;
  clientID = environment.clientID;
  redirectUrl = environment.redirectUrl;
  allowSave = false;

  constructor(private service: AuthService) {
    this.subscription = service.auth.subscribe(value => this.auth = value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  disconnect() {
    this.service.disconnect();
  };
}
