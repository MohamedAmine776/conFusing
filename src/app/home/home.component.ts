import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import { LeadersService } from '../services/leaders.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader : Leader;
  constructor(private _dishService:DishService,
    private _promotionService: PromotionService,
    private _leaderService : LeadersService
    ) {}

  ngOnInit() {
    this.dish = this._dishService.getFeaturedDish();
    this.promotion = this._promotionService.getFeaturedPromotion();
    this.leader=this._leaderService.getFeaturedLeader();
  }

}
