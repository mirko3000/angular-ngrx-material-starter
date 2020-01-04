import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class WeightService {
  constructor(private http: HttpClient) {}

  tareGrind() {
    console.log('Calling tare()...');
    return this.http.post('http://192.168.0.91:4000/grind-weight/tare', '');
  }

  tareBrew() {
    console.log('Calling tare()...');
    return this.http.post('http://192.168.0.91:4000/brew-weight/tare', '');
  }

  calibrateGrind() {
    console.log('Calling calibrate()...');
    return this.http.post(
      'http://192.168.0.91:4000/grind-weight/calibrate',
      '',
      {
        params: new HttpParams().set('weight', '641.5')
      }
    );
  }

  calibrateBrew() {
    console.log('Calling calibrate()...');
    return this.http.post(
      'http://192.168.0.91:4000/brew-weight/calibrate',
      '',
      {
        params: new HttpParams().set('weight', '641.5')
      }
    );
  }

  shutdown() {
    console.log('Calling shutdown()...');
    return this.http.get('http://192.168.0.91:4000/shutdown');
  }
}
