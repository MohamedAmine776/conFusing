import { Injectable } from '@angular/core';
import {Leader}from '../shared/leader';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {
  constructor(private _http:HttpClient) { }
getLeaders(): Observable<Leader[]> {
  return this._http.get<Leader[]>(baseUrl+'leadership');
}

getLeader(id: string): Observable<Leader> {
  return this._http.get<Leader>(baseUrl+'leadership/'+id);
}

getFeaturedLeader(): Observable<Leader> {
  return  this._http.get<Leader>(baseUrl+'Leadership?featured=true').pipe(map(leader=>leader[0]));
}
getLeaderIds(): Observable<number[] | any> {
  return this.getLeaders().pipe(map(leader => leader.map(leader => leader.id)));
}

}
