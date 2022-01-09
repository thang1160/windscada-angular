import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  load(): Promise<any> {
    return this.http
      .get('/windscada/api/v1/profile')
      .toPromise()
      .then((data: any) => this.global.activeProfile = data)
      .catch(() => {
        return Promise.resolve();
      });
  }
}
