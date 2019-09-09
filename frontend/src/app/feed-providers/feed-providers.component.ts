import { Component, OnInit } from '@angular/core';

import { FetchDataService } from '../fetch-data.service';
import { NewsLinks } from '../linkinterface';

@Component({
  selector: 'app-feed-providers',
  templateUrl: './feed-providers.component.html',
  styleUrls: ['./feed-providers.component.css']
})

export class FeedProvidersComponent implements OnInit {

  links_data_get = [];
  links_data: NewsLinks[];
  insertLinkData = {};
  editlink: NewsLinks;
  public errorMsg;

  constructor(private _feedService: FetchDataService) { }

  ngOnInit() {

  }

  postLinks(urllink: any): void {
    this.editlink = undefined;
    urllink = urllink.trim();
    if (urllink.length === 0) {
      this.errorMsg = 'Insert Link';
    } else {
      this._feedService.insertLinks(urllink)
      .subscribe(
        res => this.errorMsg = res ,
        err => this.errorMsg = err
      );
    }
  }
}
