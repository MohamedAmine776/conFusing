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
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.leaders), 2000);
  });
}

getLeader(id: string): Promise<Leader> {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.leaders.filter((Leader) => (Leader.id === id))[0]), 2000);
  });
}

getFeaturedLeader(): Promise<Leader> {
  return  new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.leaders.filter((Leader) => Leader.featured)[0]), 2000);
  });
}
}
