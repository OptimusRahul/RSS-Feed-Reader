import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';

@Component({
  selector: 'app-link-table',
  templateUrl: './link-table.component.html',
  styleUrls: ['./link-table.component.css']
})
export class LinkTableComponent implements OnInit {

  p = 1;
  itemsPerPage: number;
  totalItems: any;
  page: any;
  previousPage: any;

  links_data_get = [];
  public errorMsg;

  constructor(private _feedService: FetchDataService) { }

  ngOnInit() {
    this.fetchLinks();
  }

  fetchLinks(): void {
    this._feedService.getLinks()
    .subscribe(data => this.links_data_get = JSON.parse(JSON.stringify(data)) ,
                error => this.errorMsg = JSON.stringify(error));
                console.log(this.links_data_get);
  }

  delLink(urlid: any): void {
    this._feedService.deleteLinks(urlid)
    .subscribe(
      success => {
        this.fetchLinks();
      },
      res => this.errorMsg = res
    );
  }

}

