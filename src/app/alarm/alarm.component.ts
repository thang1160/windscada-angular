import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AlarmServices } from '../service/alarm.service';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {


  public alarms = new Array;
  public countAlarms = 0;
  public searchTagName: string = "";

  displayBasic: boolean = false;
  public selectedProduct: any
  dialogRef: any;

  constructor(public dialog: MatDialog, public alarmServices: AlarmServices) { }


  ngOnInit(): void {
    this.alarmServices.getAlarms("").subscribe(x => {
      console.log(x)
      this.alarms = x;
    })
  }

  search() {
    this.alarmServices.getAlarms(this.searchTagName).subscribe(x => {
      console.log(x)
      this.alarms = x;
    })
  }

  countAlarm(alarms: Array<any>) {
    alarms.forEach(e => {
      if ((e.alarm_class.trim() == 'Alarm' || e.alarm_class.trim() == 'Warning') && e.account_id == null) {
        this.countAlarms += 1;
      }
    });
  }

  setAlarmOff() {
    if (this.selectedProduct.account_id == null &&
      (this.selectedProduct.alarm_class.trim() == 'Alarm'
        || this.selectedProduct.alarm_class.trim() == 'Warning')) {
      const data = {
        ids: this.selectedProduct.turbine_log_id + ''
      }
      this.alarmServices.putAlarmsOff(data).subscribe(x => {
        this.search();
      })
    }
  }

  setAllAlarmOff() {
    let a : any= []
    this.alarms.forEach(e => {
      if ((e.alarm_class.trim() == 'Alarm' || e.alarm_class.trim() == 'Warning') && e.account_id == null) {
        a.push(e.turbine_log_id)
      }
    });
    let temp = a.join(",");
    console.log(temp);
    const data = {
      ids: temp
    }
    this.alarmServices.putAlarmsOff(data).subscribe(x => {
      this.search();
    })
  }

  redNotice(alarms: any): string {
    if ((alarms.alarm_class.trim() == 'Alarm' || alarms.alarm_class.trim() == 'Warning') && alarms.account_id == null) {
      return "background: red; color: black; ";
    } else {
      return "background: #2b2929; ";
    }
  }

  onRowSelect(event: Event) {
    console.log(event);
    console.log(this.selectedProduct);
    this.showBasicDialog()
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
}
