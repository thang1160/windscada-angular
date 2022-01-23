import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmServices {

  constructor(private _http: HttpClient) { }

  getAlarms(tag_name: string, turbine_id: number, page: number, page_size: number): Observable<any> {
    return this._http.get(`/windscada/api/v1/alarms?name=${tag_name}&turbine_id=${turbine_id}&page=${page}&page_size=${page_size}`);
  }

  getAlarmsRed(): Observable<any> {
    return this._http.get("/windscada/api/v1/alarms-warning");
  }

  putAlarmsOff(data: any): Observable<any> {
    return this._http.put("/windscada/api/v1/alarms-off", data);
  }
}
