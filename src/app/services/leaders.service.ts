import { Injectable } from '@angular/core';
import {Leader}from '../shared/leader';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  constructor(private _http:HttpClient,
    private _processHTTPMsgService:ProcessHTTPMsgService) { }
getLeaders(): Observable<Leader[]> {
  return this._http.get<Leader[]>(baseUrl+'leadership')
  .pipe(catchError(this._processHTTPMsgService.handleError));
}

getLeader(id: string): Observable<Leader> {
  return this._http.get<Leader>(baseUrl+'leadership/'+id)
  .pipe(catchError(this._processHTTPMsgService.handleError));
}

getFeaturedLeader(): Observable<Leader> {
  return  this._http.get<Leader>(baseUrl+'Leadership?featured=true').pipe(map(leader=>leader[0]))
  .pipe(catchError(this._processHTTPMsgService.handleError));
}
getLeaderIds(): Observable<number[] | any> {
  return this.getLeaders().pipe(map(leader => leader.map(leader => leader.id)))
  .pipe(catchError(this._processHTTPMsgService.handleError));
}

}
