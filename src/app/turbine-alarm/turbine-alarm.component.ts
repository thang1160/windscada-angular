import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AlarmComponent } from '../alarm/alarm.component';
import { TurbineLog } from '../class/TurbineLog';
import { AlarmServices } from '../service/alarm.service';
@Component({
  selector: 'app-turbine-alarm',
  templateUrl: './turbine-alarm.component.html',
  styleUrls: ['./turbine-alarm.component.scss']
})
export class TurbineAlarmComponent {

  public alarms: TurbineLog[] = [];
  public countAlarms = 0;
  public searchTagName: string = "";

  displayBasic: boolean = false;
  public selectedProduct: any
  dialogRef: any;
  observe: Subscription | undefined;
  observe1: Subscription | undefined;

  constructor(public dialog: MatDialog, private alarmComponent: AlarmComponent, public alarmServices: AlarmServices) { }

  setAllAlarmOff() {
    this.alarmComponent.setAllAlarmOff();
  }
  setAlarmOff() {
    this.alarmComponent.setAlarmOff();
  }

  search() {
    this.alarmComponent.search();
  }

  onRowSelect(event: Event) {
    this.alarmComponent.onRowSelect(event);
  }
  
  redNotice(alarms: any) {
    this.alarmComponent.redNotice(alarms);
  }
}

