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

  saveToken(token: string): string {
    localStorage.setItem('npv_token', token);
    return token;
  }

  getToken(): string {
    const token = localStorage.getItem('npv_token');
    return token || '';
  }

  deleteToken(): void {
    if(localStorage.getItem('npv_token')) {
      localStorage.removeItem('npv_token');
    }
  }

  authenticate(auth: AuthObject) {
    this._auth.next(auth);
  }

  disconnect() {
    this._auth.next(this.initial);
    this.deleteToken();
  }
}
