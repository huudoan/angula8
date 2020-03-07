import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Subject} from 'rxjs';
import {APIResponse} from '../../model/response.model';

@Injectable({providedIn: 'root'})

export class ApiService {
  constructor(private http: HttpClient,
              private authService: NbAuthService) {

  }

  call(method, url, queries?, body?, noauth = false) {
    const _parent = this;
    const response = new Subject<APIResponse>();
    if (!noauth) {
      this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token.toString(),
            });
            if (method === 'get') {
              _parent.http.get(url, {headers, params: queries}).subscribe((items: APIResponse) => {
                response.next(items);
              });
            }
            if (method === 'post') {
              _parent.http.post(url, body, {headers, params: queries}).subscribe((items: APIResponse) => {
                response.next(items);
              });
            }
            if (method === 'put') {
              _parent.http.put(url, body, {headers, params: queries}).subscribe((items: APIResponse) => {
                response.next(items);
              });
            }
            if (method === 'delete') {
              _parent.http.delete(url, {headers, params: queries}).subscribe((items: APIResponse) => {
                response.next(items);
              });
            }
          } else {
            response.next(null);
          }
        });
    } else {
      if (method === 'get') {
        _parent.http.get(url, {}).subscribe((items: APIResponse) => {
          response.next(items);
        });
      }
      if (method === 'post') {
        _parent.http.post(url, body, {}).subscribe((items: APIResponse) => {
          response.next(items);
        });
      }
      if (method === 'put') {
        _parent.http.put(url, body, {}).subscribe((items: APIResponse) => {
          response.next(items);
        });
      }
      if (method === 'delete') {
        _parent.http.delete(url, {}).subscribe((items: APIResponse) => {
          response.next(items);
        });
      }
    }
    return response.asObservable();
  }

  get(url, queries?) {
    return this.call('get', url, queries);
  }

  post(url, queries?, body?) {
    return this.call('post', url, queries, body);
  }

  put(url, queries?, body?) {
    return this.call('put', url, queries, body);
  }

  delete(url, queries?) {
    return this.call('delete', url, queries);
  }

  getNoAuth(url, queries?) {
    return this.call('get', url, queries, null, true);
  }

  postNoAuth(url, queries?, body?) {
    return this.call('post', url, queries, body, true);
  }
}
