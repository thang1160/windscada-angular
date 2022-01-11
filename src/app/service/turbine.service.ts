import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurbineService {

  constructor(private _http: HttpClient) { }

  getOverview(): Observable<any> {
    return this._http.get("/windscada/api/v1/overview");
  }
}
