import { Component } from '@angular/core';

@Component({
  selector: 'npw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-picviewer';

  auth = {
    isAuthenticated: false,
    username: ''
  }

}
