import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import {
  TOKEN_NAME,
  INVALID_TOKEN_PARAM,
  ERROR_TOKEN_PARAM
} from '../../shared/constants';

@Injectable()
export class TokenResolver implements Resolve<any> {
  constructor(
    private router: Router,
    private service: AuthService
  ) {}

  getResponse(status = 'success', message = 'Token saved') {
    return { status, message };
  }

  resolve(route: ActivatedRouteSnapshot) {
    const { fragment } = route;

    if (!fragment) return;

    const [key, token] = fragment.split('&')[0].split('=');

    if (key !== TOKEN_NAME) {
      return this.getResponse('error', INVALID_TOKEN_PARAM);
    }

    const savedToken = this.service.saveToken(token);

    if(!savedToken) {
      return this.getResponse('error', ERROR_TOKEN_PARAM);
    }

    return this.getResponse();
  }
}