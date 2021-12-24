import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceTrendService {

  constructor(private _http: HttpClient) { }

  getHistory(day: number): Observable<any> {
    return this._http.get("/windscada/api/v1/performance-trend?day" + day);
  }
}
