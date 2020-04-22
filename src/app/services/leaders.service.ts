import { Injectable } from '@angular/core';
import {Leader}from '../shared/leader';
import {LEADERS} from '../shared/LEADERS';
@Injectable({
  providedIn: 'root'
})
export class LeadersService {
leaders = LEADERS;
  constructor() { }

getLeaders(): Promise<Leader[]> {
  return Promise.resolve(this.leaders);
}

getLeader(id: string): Promise<Leader> {
  return Promise.resolve(this.leaders.filter((dish) => (dish.id === id))[0]);
}

getFeaturedLeader(): Promise<Leader> {
  return Promise.resolve(this.leaders.filter((dish) => dish.featured)[0]);
}
}
