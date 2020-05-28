import { Injectable } from '@angular/core';
import { Promotion} from '../shared/promotion';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  
  constructor(private _http:HttpClient,
    private _processHTTPMsgService:ProcessHTTPMsgService) { }
  getPromotions(): Observable<Promotion[]> {
    return this._http.get<Promotion[]>( baseUrl+'promotions')
    .pipe(catchError(this._processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this._http.get<Promotion>( baseUrl+'promotions/'+id)
    .pipe(catchError(this._processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this._http.get<Promotion>( baseUrl+'promotions?featured=true').pipe(map(promotion=>promotion[0]))
    .pipe(catchError(this._processHTTPMsgService.handleError));
  }

  getPromotionIds(){
    return this.getPromotions().pipe(map(promotions=>promotions.map(promotion=>promotion[0])))
    .pipe(catchError(this._processHTTPMsgService.handleError));
  }
}
