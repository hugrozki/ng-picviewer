import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedService } from '../shared/feed.service';

@Component({
  selector: 'npv-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnDestroy {
  presentationSubscription: Subscription;
  inPresentation = false;

  constructor(private feedService: FeedService) {
    this.presentationSubscription = feedService
                                    .inPresentationMode
                                    .subscribe(value => { this.inPresentation = value });
  }

  ngOnDestroy(): void {
    this.presentationSubscription.unsubscribe();
  }
}
