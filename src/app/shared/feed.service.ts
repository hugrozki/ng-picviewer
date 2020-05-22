import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Settings, FeedItem } from './interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private apiToken: string;

  private settings: Settings = {
    onlyImage: false,
    hideRates: false,
    numImages: 10
  }

  private _inPresentationMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _feed: BehaviorSubject<FeedItem[]> = new BehaviorSubject([]);

  readonly inPresentationMode: Observable<boolean> = this._inPresentationMode.asObservable();
  readonly feed: Observable<FeedItem[]> = this._feed.asObservable();
  readonly maxNumImages: number = 15;

  constructor(private http: HttpClient) {}

  getSettings(): Settings {
    return { ...this.settings };
  }

  setSettings(settings: Settings) {
    const oldNumImages = this.settings.numImages;
    this.settings = { ...settings };
  }

  play() {
    this._inPresentationMode.next(true);
  }

  pause() {
    this._inPresentationMode.next(false);
  }

  getUser(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}users/self/?access_token=${this.apiToken}`)
      .pipe(
        map((user: any) => {
          const data = user.data;

          return {
            id: data.id,
            username: data.username,
            avatar: data['profile_picture']
          }
        }),
        catchError((errors: HttpErrorResponse) => {
          if (errors.error && errors.error.meta) return throwError(errors.error.meta);
          return throwError(errors);
        })
      );
  }

  getFeed = () => {
    return this.http
      .get(`${environment.apiUrl}users/self/media/recent/?access_token=${this.apiToken}&count=${this.settings.numImages}`)
      .pipe(
        map((media: any) => {
          const data = media.data;

          const feed = data.reverse().map(item => {
            const { id, caption, images, user, comments, likes } = item;

            return {
              id,
              caption: caption ? caption.text : '',
              images,
              user: user.username,
              comments: comments.count,
              likes: likes.count
            };
          });

          this._feed.next(feed);

          return true;
        }),
        catchError((errors: HttpErrorResponse) => {
          if (errors.error && errors.error.meta) return throwError(errors.error.meta);
          return throwError(errors);
        })
      );
  }

  getData(token: string): Observable<any> {
    this.apiToken = token;
    return forkJoin([this.getUser(), this.getFeed()]);
  }
}
