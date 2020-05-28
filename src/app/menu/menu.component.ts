import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import { flyInOut, expand } from '../animations/animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class MenuComponent implements OnInit {
dishes:Dish[];
  msgErr:String;

  
  constructor(private _dishService : DishService,
    @Inject('BaseUrl') public BaseUrl 
    ) { }

  ngOnInit() {
      this._dishService.getDishes().subscribe(dishes=> this.dishes=dishes,
        msgErr=>this.msgErr=<any>msgErr);
  }




}
