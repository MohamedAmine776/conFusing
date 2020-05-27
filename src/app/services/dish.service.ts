import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';
import {Dish} from '../shared/dish';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private _http:HttpClient,
    private _processHTTPMsgService:ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this._http.get<Dish[]>(baseUrl+'dishes').pipe(catchError(this._processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return  this._http.get<Dish>(baseUrl+'dishes/'+id).pipe(catchError(this._processHTTPMsgService.handleError));

  }

  getFeaturedDish(): Observable<Dish> {
    return   this._http.get<Dish>(baseUrl+'dishes?featured=true').pipe(map(dishes=>dishes[0]))
    .pipe(catchError(this._processHTTPMsgService.handleError));

}
getDishIds(): Observable<number[] | any> {
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  .pipe(catchError(this._processHTTPMsgService.handleError));
}
}
