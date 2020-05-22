import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { FeedService } from 'src/app/shared/feed.service';
import { AuthObject } from 'src/app/shared/interfaces';
import { environment } from '../../../environments/environment';
import { MessageService } from '../shared/message.service';

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
    private authService: AuthService,
    private feedService: FeedService,
    private messageService: MessageService
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
    this.message = this.messageService.message;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }

  play = () => {
    this.feedService.play();
  }
}
