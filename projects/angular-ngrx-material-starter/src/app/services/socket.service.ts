import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../shared/models/message';
import { Event } from '../shared/models/event';
import { WeightData } from '../shared/models/weightdata';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.0.91:4001';

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL, { transports: ['websocket'] });
  }

  public endSocket(): void {
    this.socket.disconnect();
  }

  public onMessage(): Observable<WeightData> {
    console.log('New Message');
    return new Observable<WeightData>(observer => {
      this.socket.on('grind-weight', (data: WeightData) => {
        observer.next(data);
      });
      this.socket.on('brew-weight', (data: WeightData) => {
        observer.next(data);
      });
    });
  }

  public onEvent(event: Event): Observable<any> {
    console.log('New Event');
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
