import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { Bean } from '../shared/models/bean.model';

@Injectable()
export class BeansService {
  constructor(private http: HttpClient) {}

  getBeans(): Observable<Bean[]> {
    return this.http.get<Bean[]>('http://192.168.0.91:4000/beans/');
  }

  addBean(bean: Bean): Observable<Bean> {
    return this.http.post<Bean>('http://192.168.0.91:4000/beans/add', bean);
  }

  getBean(bean: Bean): Observable<Bean> {
    return this.http.get<Bean>(`http://192.168.0.91:4000/beans/${bean.id}`);
  }

  editBean(bean: Bean): Observable<any> {
    return this.http.put(`http://192.168.0.91:4000/beans/${bean.id}`, bean, {
      responseType: 'text'
    });
  }

  deleteBean(bean: Bean): Observable<any> {
    return this.http.delete(`http://192.168.0.91:4000/beans/${bean.id}`, {
      responseType: 'text'
    });
  }
}
