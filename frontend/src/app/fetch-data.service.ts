import { Injectable } from '@angular/core';
import { NewsFeed} from './feedinterface';
import { NewsLinks } from './linkinterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
const API_URL = environment.Links;

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  private handleError: HandleError;
  private message: MessageService;
  constructor(private _http: HttpClient, httpErrorHandler: HttpErrorHandlerService, httpMessageResponse: MessageService) {
    this.handleError = httpErrorHandler.createHandleError('FetchDataService');
  }

  getLinks(): Observable<NewsLinks[]> {
    catchError(error => {
      return throwError(error.message || 'Server Error');
      });
      return this._http.get<NewsLinks[]>(API_URL.concat('/api/rssidurls'));
  }

  insertLinks(link: NewsLinks): Observable<NewsLinks> {
    const newLink = '{ ' + '"links"' + ':' + '"' + link + '"}';
      return this._http.post<NewsLinks>(API_URL.concat('/api/verinsurls'), newLink, httpOptions)
      .pipe(
        catchError(this.handleError('insertLinks', link))
      );
  }

  deleteLinks(link_id: NewsLinks): Observable<NewsLinks> {
    const dellink = '{ ' + '"Id"' + ':' +link_id + '}';
    return this._http.post<NewsLinks>(API_URL.concat('/delurl'), dellink, httpOptions)
    .pipe(
      catchError(this.handleError('deleteLinks', link_id))
    );
  }

  getFeeds(): Observable<NewsFeed[]> {
    catchError(error => {
      return throwError(error.message || 'Server Error');
      });
      return this._http.get<NewsFeed[]>(API_URL.concat('/api/viewfeeds'));
  }
}
