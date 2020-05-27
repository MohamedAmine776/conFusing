import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Dish} from '../shared/dish';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private _http:HttpClient) { }

  getDishes(): Observable<Dish[]> {
    return this._http.get<Dish[]>(baseUrl+'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return  this._http.get<Dish>(baseUrl+'dishes/'+id);

  }

  getFeaturedDish(): Observable<Dish> {
    return   this._http.get<Dish>(baseUrl+'dishes?featured=true').pipe(map(dishes=>dishes[0]));

}
getDishIds(): Observable<number[] | any> {
  return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
}
}
