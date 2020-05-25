import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ViewerComponent } from './viewer.component';
import { StatusComponent } from './status/status.component';
import { ViewComponent } from './view/view.component';
import { CommonModule } from '@angular/common';
import { FeedService } from '../shared/feed.service';
import { TokenResolver } from './shared/token.resolver';

const routes: Routes = [
  {
    path: 'success',
    redirectTo: ''
  },
  {
    path: '',
    component: ViewerComponent,
    resolve: {
      token: TokenResolver
    }
  }
]

@NgModule({
  declarations: [
    ViewerComponent,
    StatusComponent,
    ViewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    FeedService,
    TokenResolver
  ]
})
export class ViewerModule { }
