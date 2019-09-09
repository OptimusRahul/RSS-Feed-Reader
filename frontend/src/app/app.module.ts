import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FeedSectionComponent } from './feed-section/feed-section.component';
import { HttpClientModule } from '@angular/common/http';
import { FetchDataService } from './fetch-data.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';
import { FeedProvidersComponent } from './feed-providers/feed-providers.component';
import { LinkTableComponent } from './link-table/link-table.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FooterComponent } from './footer/footer.component';
import { InvalidPageComponent } from './invalid-page/invalid-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    FeedSectionComponent,
    routingComponents,
    FeedProvidersComponent,
    LinkTableComponent,
    SearchFilterPipe,
    FooterComponent,
    InvalidPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    NgxAutoScrollModule
  ],
  providers: [FetchDataService, HttpErrorHandlerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
