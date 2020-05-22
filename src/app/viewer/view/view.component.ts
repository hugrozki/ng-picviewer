import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FeedService } from 'src/app/shared/feed.service';
import { Settings, FeedItem } from 'src/app/shared/interfaces';

@Component({
  selector: 'npv-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: [
    trigger('imageTransition', [
      state('show', style({
        marginLeft: 0
      })),
      state('hide', style({
        marginLeft: '-150%'
      })),
      transition('show => hide', [
        animate('0.8s')
      ]),
      transition('hide => show', [
        animate('0.8s')
      ])
    ]),
    trigger('descriptionTransition', [
      state('show', style({
        marginRight: 0
      })),
      state('hide', style({
        marginRight: '-150%'
      })),
      transition('show => hide', [
        animate('0.8s')
      ]),
      transition('hide => show', [
        animate('0.8s')
      ])
    ])
  ]
})
export class ViewComponent implements OnInit, OnDestroy  {

  show = false;
  barProgress = 0;
  intervalDuration = 5;
  counter = 0;
  currentIndex = 0;
  currentPost = {
    id: null,
    url: '',
    user: '',
    caption: '',
    likes: 0,
    comments: 0,
  };

  settings: Settings;
  feedSubscription: Subscription;
  feed: FeedItem[];
  interval;

  step = 100 / this.intervalDuration;

  constructor(private feedService: FeedService) {
    this.feedSubscription = feedService.feed.subscribe(value => {
      this.feed = value;
    });
  }

  ngOnInit(): void {
    this.settings = this.feedService.getSettings();

    if (this.feed.length === this.settings.numImages) {
      this.play();
      return;
    }

    this.feedService.getFeed().subscribe(response => {
      this.play();
    });
  }

  ngOnDestroy(): void {
    this.feedSubscription.unsubscribe();
  }

  setCurrentPost() {
    const {
      id,
      caption,
      images,
      user,
      comments,
      likes
    } = this.feed[this.currentIndex];

    this.currentPost = {
      id,
      url: images.standard_resolution.url,
      user,
      caption,
      likes,
      comments,
    }
  }

  transition = () => {
    if (this.counter === 0) {
      this.setCurrentPost();
      this.show = true;
    }

    if (this.counter < this.intervalDuration) {
      this.counter++;
      this.barProgress = this.counter * this.step;
    } else {
      this.counter = 0;
      this.barProgress = 0;
      this.show = false;

      if(!this.currentIndex) {
        this.currentIndex = this.feed.length - 1
      } else {
        this.currentIndex --;
      }

    }
  }

  play() {
    this.currentIndex = this.feed.length - 1;
    this.interval = setInterval(this.transition, 1000);
  }

  pause() {
    this.show = false;
    this.feedService.pause();
    clearInterval(this.interval);
  }

  get imageHeight() {
    return this.settings.onlyImage ? 'image full' : 'image';
  }

  get progress() {
    return `${this.barProgress}%`
  }
}
