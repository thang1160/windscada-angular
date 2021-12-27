import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmServices {

  constructor(private _http: HttpClient) { }

  getAlarms(tag_name: string): Observable<any> {
    return this._http.get("/windscada/api/v1/alarms?name=" + tag_name);
  }

  putAlarmsOff(data: any): Observable<any> {
    return this._http.put("/windscada/api/v1/alarms-off", data);
  }
}
