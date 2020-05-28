import { Component, OnInit, Inject } from '@angular/core';
import {Leader}from '../shared/leader';
import {LeadersService}from '../services/leaders.service';
import { flyInOut, expand } from '../animations/animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class AboutComponent implements OnInit {
leaders:Leader[];
  LeadMsgErr: String;
  constructor(private _leaderService : LeadersService,
    @Inject('BaseUrl') public BaseUrl) { }

  ngOnInit() {
        this._leaderService.getLeaders().subscribe(leaders => this.leaders=leaders,
          msgErr=>this.LeadMsgErr=<any>msgErr);
  }

}
