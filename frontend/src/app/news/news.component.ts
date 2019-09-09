import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [SearchFilterPipe]
})
export class NewsComponent implements OnInit {

  public title = 'News Feeds';
  public feeds = [];
  filterText: any;
  public errorMsg;
  constructor(private _feedService: FetchDataService) { }

  ngOnInit() {
    this._feedService.getFeeds()
    .subscribe(data => this.feeds = JSON.parse(JSON.stringify(data)) ,
                error => this.errorMsg = JSON.stringify(error));
  }
}
