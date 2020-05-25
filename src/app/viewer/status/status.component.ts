import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { FeedService } from 'src/app/shared/feed.service';
import { AuthObject, Settings } from 'src/app/shared/interfaces';
import { environment } from '../../../environments/environment';
import {
  NO_TOKEN_PARAM,
  NO_TOKEN_STRING,
  INVALID_TOKEN_PARAM,
  INVALID_TOKEN_STRING,
  ERROR_TOKEN_PARAM,
  ERROR_TOKEN_STRING
} from '../../shared/constants';

@Component({
  selector: 'npv-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {

  authSubscription: Subscription;
  feedSubscription: Subscription;
  auth: AuthObject;

  message = null;
  loading = false;
  showStartPresentation = false;
  authUrl = environment.authUrl;
  clientID = environment.clientID;
  redirectUrl = environment.redirectUrl;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private feedService: FeedService,
  ) {

    this.authSubscription = authService.auth.subscribe(value => {
      this.auth = value;
    });

    this.feedSubscription = feedService.feed.subscribe(value => {
      if (value.length > 0) {
        this.showStartPresentation = true;
      }
    });
  }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      location.hash = '';

      const { token } = data;

      if (token && token.status === 'error') {
        this.setErrorMessage(this.getErrorString(token.message));
      }
    });

    const authToken: string =  this.authService.getToken();
    if (authToken) this.fetchData();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }

  handleError = (error) => {
    this.setErrorMessage(error['error_message']);
    this.loading = false;
  }

  fetchData() {
    const authToken: string =  this.authService.getToken();

    if (!this.auth.isAuthenticated) {

      this.loading = true;

      this.feedService.getData(authToken).subscribe((results) => {
        const user = results[0];
        this.authService.authenticate({isAuthenticated: true, ...user});
        this.loading = false;
      }, this.handleError);

    } else if(this.feedService.numImagesUpdated) {

      this.loading = true;

      this.feedService.getFeed().subscribe(response => {
        this.loading = false;
      }, this.handleError);

    }
  }

  getErrorString(errorParam: string) {
    const errorStrings = {
      [NO_TOKEN_PARAM]: NO_TOKEN_STRING,
      [INVALID_TOKEN_PARAM]: INVALID_TOKEN_STRING,
      [ERROR_TOKEN_PARAM]: ERROR_TOKEN_STRING
    }

    return errorStrings[errorParam];
  }

  setErrorMessage(message: string) {
    this.message = {
      type: 'error',
      message: message
    }
  }

  play = () => {
    this.feedService.play();
  }
}
