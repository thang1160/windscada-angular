import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from 'src/app/class/TurbineLog';
import { AlarmServices } from 'src/app/service/alarm.service';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit, OnDestroy {
  @ViewChild('pTable') pTable: Table | undefined;
  @Input() rows = 10;
  public first = 0;

  public alarms: TurbineLog[] = [];
  public countAlarms = 0;
  public searchTagName: string = "";

  displayBasic: boolean = false;
  public selectedProduct: any
  dialogRef: any;
  observe: Subscription | undefined;

  public turbineSeleted: number = 0;
  public turbine: any = []

  constructor(public dialog: MatDialog, public alarmServices: AlarmServices) { }

  ngOnDestroy(): void {
    if (this.observe) {
      this.observe.unsubscribe();
    }
  }

  onChangeTurbine() {
    console.log(this.turbineSeleted);
    this.search();
  }

  socket = webSocket({
    url: "ws://localhost:8888/alarms",
    deserializer: (e) => e.data.text()
  });

  ngOnInit(): void {
    this.turbine = [
      {
        'label': 'All',
        'value': 0
      }, {
        'label': 'Turbine 1',
        'value': 1
      }, {
        'label': 'Turbine 2',
        'value': 2
      }, {
        'label': 'Turbine 3',
        'value': 3
      }, {
        'label': 'Turbine 4',
        'value': 4
      }, {
        'label': 'Turbine 5',
        'value': 5
      }, {
        'label': 'Turbine 6',
        'value': 6
      }, {
        'label': 'Turbine 7',
        'value': 7
      }, {
        'label': 'Turbine 8',
        'value': 8
      }, {
        'label': 'Turbine 9',
        'value': 9
      }, {
        'label': 'Turbine 10',
        'value': 10
      }, {
        'label': 'Turbine 11',
        'value': 11
      }, {
        'label': 'Turbine 12',
        'value': 12
      },
    ];
  }

  initSocket() {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(() => {
          if (!this.loading) {
            this.loadAlarms({ first: this.first, rows: this.rows });
          }
        }).catch(x => console.error(x))
      });
  }

  search() {
    if (this.observe) {
      this.observe.unsubscribe();
    }
    this.pTable?.reset();
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
      if ((e.alarm_class.trim().toLowerCase() == 'alarm' ||
        e.alarm_class.trim().toLowerCase() == 'warning') && e.account_id == null) {
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
    if ((alarms.alarm_class.trim().toLowerCase() == 'alarm' ||
      alarms.alarm_class.trim().toLowerCase() == 'warning') && alarms.account_id == null) {
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

  wrapperHeight = 0;

  getScrollHeight(pTable: Table) {
    if (!this.wrapperHeight) {
      let wrapper: HTMLDivElement = pTable.el.nativeElement.closest('.component-content');
      this.wrapperHeight = wrapper.clientHeight;
    }
    return this.wrapperHeight - 76 - 62 + 'px';
  }

  loading = true;
  totalRecords = 0;

  loadAlarms(event: LazyLoadEvent) {
    if (event.first == undefined || event.rows == undefined) return;
    this.first = event.first;
    this.rows = event.rows;
    this.loading = true;
    this.alarmServices.getAlarms(this.searchTagName, this.turbineSeleted, this.first / this.rows, this.rows).subscribe((x: any[]) => {
      console.log(x);
      this.alarms = x;
      this.loading = false;
      if (x && x[0] && !isNaN(x[0].total)) {
        this.totalRecords = parseInt(x[0].total);
      } else {
        this.totalRecords = 0;
      }
      this.initSocket();
    });
  }
}
