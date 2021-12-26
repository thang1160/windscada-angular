import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteLog } from '../class/SiteLog';

@Injectable({
  providedIn: 'root'
})
export class PerformanceTrendService {

  constructor(private _http: HttpClient) { }

  getHistory(day: number): Observable<SiteLog[]> {
    return this._http.get<SiteLog[]>("/windscada/api/v1/performance-trend?day=" + day);
  }
}
