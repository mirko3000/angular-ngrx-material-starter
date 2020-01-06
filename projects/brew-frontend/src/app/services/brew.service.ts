import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Bean } from '../shared/models/bean.model';
import { Grind } from '../shared/models/grind.model';
import { Brew } from '../shared/models/brew.model';
import { Coffee } from '../shared/models/coffee.model';

import * as moment from 'moment';

@Injectable()
export class BrewService {
  private beans;
  private beansSet = false;
  private brew;
  private brewSet = false;
  private grind;
  private grindSet = false;

  constructor(private http: HttpClient) {}

  getCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>('http://192.168.0.91:4000/brews/');
  }

  saveCurrentCoffee(): Observable<any> {
    // Save coffee to DB
    let c = new Coffee();
    c.beanId = this.beans.id;
    c.brewDate = moment().format();
    c.grindWeight = parseFloat(this.grind.weight);
    c.grindTime = this.grind.milliseconds;
    c.brewQuantity = parseFloat(this.brew.quantity);
    c.brewTime = this.brew.milliseconds;
    c.brewTemperature = 92;

    return this.http.post('http://192.168.0.91:4000/brews/', c);
  }

  deleteCoffee(id): Observable<Coffee> {
    return this.http.delete<Coffee>(`http://192.168.0.91:4000/brews/${id}`, {
      responseType: 'json'
    });
  }

  reset() {
    this.brewSet = false;
    this.grindSet = false;
  }

  setBeans(beans: Bean) {
    this.beans = beans;
    this.beansSet = true;
  }

  getBeans() {
    if (this.beansSet) {
      return this.beans.name;
    }
    return '<empty>';
  }

  setGrind(grind: Grind) {
    this.grind = grind;
    this.grindSet = true;
  }

  getGrind() {
    if (this.grindSet) {
      return this.grind.weight + 'g (' + this.grind.milliseconds + 'ms)';
    }
    return '<empty>';
  }

  setBrew(brew: Brew) {
    this.brew = brew;
    this.brewSet = true;
  }

  getBrew() {
    if (this.brewSet) {
      return this.brew.quantity + 'ml (' + this.brew.milliseconds + 'ms)';
    }
    return '<empty>';
  }
}
