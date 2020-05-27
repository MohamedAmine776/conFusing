import { Component, OnInit, Inject } from '@angular/core';
import {Leader}from '../shared/leader';
import {LeadersService}from '../services/leaders.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
leaders:Leader[];
  constructor(private _leaderService : LeadersService,
    @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit() {
        this._leaderService.getLeaders().subscribe(leaders => this.leaders=leaders);
  }

}
