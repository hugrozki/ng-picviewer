import { env } from './env.enviroment';

export const environment = {
  production: true,
  apiUrl: 'https://api.instagram.com/v1/',
  authUrl: 'https://api.instagram.com/oauth/authorize/',
  redirectUrl: 'http://localhost/success/',
  ...env
};
