import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FeedProvidersComponent } from './feed-providers/feed-providers.component';
import { LinkTableComponent } from './link-table/link-table.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'home',
    component: CarouselComponent,
  },
  {
    path: 'add-links',
    component: FeedProvidersComponent
  },
  {
    path: 'fetch-links',
    component: LinkTableComponent
  },
  {
    path: '**',
    component: InvalidPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [AppComponent, NewsComponent, InvalidPageComponent];
