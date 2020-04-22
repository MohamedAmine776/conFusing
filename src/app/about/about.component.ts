import { Component, OnInit } from '@angular/core';
import {Leader}from '../shared/leader';
import {LeadersService}from '../services/leaders.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
leaders:Leader[];
  constructor(private _leaderService : LeadersService) { }

  ngOnInit() {
        this._leaderService.getLeaders().then(leaders => this.leaders=leaders);
  }

}
