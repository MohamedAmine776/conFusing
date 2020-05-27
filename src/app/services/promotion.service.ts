import { Injectable } from '@angular/core';
import { Promotion} from '../shared/promotion';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  
  constructor(private _http:HttpClient) { }
  getPromotions(): Observable<Promotion[]> {
    return this._http.get<Promotion[]>( baseUrl+'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this._http.get<Promotion>( baseUrl+'promotions/'+id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this._http.get<Promotion>( baseUrl+'promotions?featured=true').pipe(map(promotion=>promotion[0]));
  }

  getPromotionIds(){
    return this.getPromotions().pipe(map(promotions=>promotions.map(promotion=>promotion[0])))
  }
}
