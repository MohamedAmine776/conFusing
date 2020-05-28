import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import { LeadersService } from '../services/leaders.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader : Leader;
  dishMsgErr:String;
  promMsgErr: String;
  LeadMsgErr: String;
  constructor(private _dishService:DishService,
    private _promotionService: PromotionService,
    private _leaderService : LeadersService,
    @Inject('BaseUrl') public BaseUrl
    ) {}

  ngOnInit() {
      this._dishService.getFeaturedDish().subscribe(dish => this.dish=dish,
        dishMsgErr=>this.dishMsgErr=<any>dishMsgErr);
        
     this._promotionService.getFeaturedPromotion().subscribe(promo=>this.promotion =promo,
      msgErr=>this.promMsgErr=<any>msgErr);

    this._leaderService.getFeaturedLeader().subscribe(leader=>this.leader=leader,
      msgErr=>this.LeadMsgErr=<any>msgErr);
  }

}
