import { Injectable } from '@angular/core';
import { AuthObject } from './interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private initial = {
    isAuthenticated: false,
    id: '',
    username: '',
    avatar: ''
  };

  private _auth: BehaviorSubject<AuthObject> = new BehaviorSubject(this.initial);

  readonly auth: Observable<AuthObject> = this._auth.asObservable();


  authenticate(auth: AuthObject) {
    this._auth.next(auth);
  }

  disconnect() {
    this._auth.next(this.initial);
  }
}
