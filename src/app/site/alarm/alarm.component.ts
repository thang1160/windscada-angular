import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from 'src/app/class/TurbineLog';
import { AlarmServices } from 'src/app/service/alarm.service';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements AfterViewInit, OnDestroy {


  public alarms: TurbineLog[] = [];
  public countAlarms = 0;
  public searchTagName: string = "";

  displayBasic: boolean = false;
  public selectedProduct: any
  dialogRef: any;
  observe: Subscription | undefined;

  constructor(public dialog: MatDialog, public alarmServices: AlarmServices) { }

  ngOnDestroy(): void {
    if (this.observe) {
      this.observe.unsubscribe();
    }
  }

  socket = webSocket({
    url: "ws://localhost:8889/alarms",
    deserializer: (e) => e.data.text()
  });

  ngAfterViewInit(): void {
    this.initSocket();
  }

  initSocket() {
    let setData = new Set();
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let tempId = this.alarms.map(e => {
            return e.turbine_log_id;
          });
          tempId.forEach(e => {
            setData.add(e);
          });
          let array: TurbineLog[] = JSON.parse(result);
          for (const item of array) {
            if (!setData.has(item.turbine_log_id)) {
              setData.add(item.turbine_log_id);
              this.alarms = [item, ...this.alarms];
              this.countAlarm(this.alarms);
            }
          }
        }).catch(x => console.error(x))
      });
  }

  ngOnInit(): void {
    this.alarmServices.getAlarms("").subscribe(x => {
      this.alarms = x;
    })
  }

  search() {
    if (this.observe) {
      this.observe.unsubscribe();
    }
    this.alarmServices.getAlarms(this.searchTagName).subscribe(x => {
      this.alarms = x;
      this.countAlarm(this.alarms);
      this.initSocket();
    })
  }

  countAlarm(alarms: TurbineLog[]) {
    alarms.forEach(e => {
      console.log(e.alarm_class);
      if ((e.alarm_class.trim().toLowerCase() == 'alarm' || e.alarm_class.trim().toLowerCase() == 'warning') && e.account_id == null) {
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
    let a: any = []
    this.alarms.forEach(e => {
      if ((e.alarm_class.trim().toLowerCase() == 'alarm' || e.alarm_class.trim().toLowerCase() == 'warning') && e.account_id == null) {
        a.push(e.turbine_log_id)
      }
    });
    let temp = a.join(",");
    const data = {
      ids: temp
    }
    this.alarmServices.putAlarmsOff(data).subscribe(x => {
      this.search();
    })
  }

  redNotice(alarms: any): string {
    if ((alarms.alarm_class.trim().toLowerCase() == 'alarm' || alarms.alarm_class.trim().toLowerCase() == 'warning') && alarms.account_id == null) {
      return "background: red; color: black; ";
    } else {
      return "background: #2b2929; ";
    }
  }

  onRowSelect(event: Event) {
    this.showBasicDialog()
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
}
