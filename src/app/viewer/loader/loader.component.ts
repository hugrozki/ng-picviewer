import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FeedService } from 'src/app/shared/feed.service';
import { MessageService } from '../shared/message.service';
import {
  TOKEN_NAME,
  NO_TOKEN_STRING,
  INVALID_TOKEN_STRING
} from '../../shared/constants';

@Component({
  selector: 'npv-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private feedService: FeedService,
    private messageService: MessageService,
  ) { }

  redirectWithError(message: string) {
    this.messageService.setMessage('error', message);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string) => {
        if (!fragment) {
          this.redirectWithError(NO_TOKEN_STRING)
          return;
        };

        const [key, token] = fragment.split('=');

        if (key !== TOKEN_NAME) {
          this.redirectWithError(INVALID_TOKEN_STRING);
          return;
        }

        this.feedService.getData(token).subscribe((results) => {
          const user = results[0];
          this.authService.authenticate({isAuthenticated: true, ...user});

          this.router.navigate(['/']);

        }, (error) => {
          this.redirectWithError(error['error_message'])
          return;
        });
    })
  }

}
