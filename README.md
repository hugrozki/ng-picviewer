# NgPicviewer. Instagram Feed Test

NgPicviewer is a test application created in Angular 9 to view instagram images. You connect to an account to access publications and display them cyclically.


## Installation for development

#### Create Instagram Client

[Go to Manage Clients](https://www.instagram.com/developer/clients/manage/) on instagram developer site to assign an client_id and client_secret for the application.


#### Provide settings values

Go to src/environments, inside create the env.enviroment.ts file and type the next:

```
export const env = {
  clientID: INSTAGRAM_CLIENT_ID
}
```

Go to environment.ts and environment.prod.ts files and change value of redirectUrl key. REDIRECT_URI is value of the server root, 'http://localhost:4200' for example.

```
export const environment = {
  ...
  apiUrl: 'https://api.instagram.com/v1/',
  authUrl: 'https://api.instagram.com/oauth/authorize/',
  redirectUrl: 'REDIRECT_URI/success/'
};
```

In the same files import env.enviroment.ts and add the imported values

```
import { env } from './env.enviroment';

export const environment = {
  ...
  redirectUrl: 'REDIRECT_URI/success/'
  ...env
};

```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
