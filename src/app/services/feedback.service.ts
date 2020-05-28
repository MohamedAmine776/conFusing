import { Injectable } from '@angular/core';
import {Feedback} from '../shared/feedback'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseUrl } from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _http:HttpClient,
    private _processHTTPMsgService:ProcessHTTPMsgService
    ) { }


addFeedback(fb:Feedback): Observable<Feedback>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this._http.post<Feedback>(baseUrl+"feedback",fb,httpOptions)
  .pipe(catchError(this._processHTTPMsgService.handleError));
}

}
