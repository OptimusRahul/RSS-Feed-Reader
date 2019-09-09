import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
@Component({
  selector: 'app-feed-section',
  templateUrl: './feed-section.component.html',
  styleUrls: ['./feed-section.component.css']
})
export class FeedSectionComponent implements OnInit {

  public feeds = [];
  public errorMsg;
  constructor(private _feedService: FetchDataService) { }

  ngOnInit() {
    this._feedService.getFeeds()
    .subscribe(data => this.feeds = JSON.parse(JSON.stringify(data)) ,
                error => this.errorMsg = JSON.stringify(error));
  }
}
