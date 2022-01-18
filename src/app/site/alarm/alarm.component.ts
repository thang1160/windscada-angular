// import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';
// import { Subscription } from 'rxjs';
// import { webSocket } from 'rxjs/webSocket';
// import { TurbineLog } from 'src/app/class/TurbineLog';
// import { AlarmServices } from 'src/app/service/alarm.service';
// @Component({
//   selector: 'app-alarm',
//   templateUrl: './alarm.component.html',
//   styleUrls: ['./alarm.component.scss']
// })
// export class AlarmComponent implements OnInit, AfterViewInit, OnDestroy {


//   public alarms: TurbineLog[] = [];
//   public countAlarms = 0;
//   public searchTagName: string = "";

//   displayBasic: boolean = false;
//   public selectedProduct: any
//   dialogRef: any;
//   observe: Subscription | undefined;
//   observe1: Subscription | undefined;

//   public turbineSeleted: number = 0;
//   public turbine: any = []

//   constructor(public dialog: MatDialog, public alarmServices: AlarmServices) { }

//   ngOnDestroy(): void {
//     if (this.observe) {
//       this.observe.unsubscribe();
//     }
//     if (this.observe1) {
//       this.observe1.unsubscribe();
//     }
//   }

//   onChangeTurbine() {
//     console.log(this.turbineSeleted);
//     this.search(this.turbineSeleted)
//   }

//   socket = webSocket({
//     url: "ws://localhost:8888/alarms",
//     deserializer: (e) => e.data.text()
//   });

//   socket1 = webSocket({
//     url: "ws://localhost:8888/alarms-warning",
//     deserializer: (e) => e.data.text()
//   });


//   ngAfterViewInit(): void {
//     this.initSocket();
//     this.initSocket1();
//   }

//   initSocket() {
//     let setData = new Set();
//     if (!this.observe || this.observe?.closed)
//       this.observe = this.socket.subscribe((data: Promise<string>) => {
//         data.then(result => {
//           let tempId = this.alarms.map(e => {
//             return e.turbine_log_id;
//           });
//           tempId.forEach(e => {
//             setData.add(e);
//           });
//           let array: TurbineLog[] = JSON.parse(result);
//           for (const item of array) {
//             console.log(item);
//             if (this.turbineSeleted == 0) {
//               if (!setData.has(item.turbine_log_id)) {
//                 setData.add(item.turbine_log_id);
//                 this.alarms = [item, ...this.alarms];
//               }
//             }
//             else {
//               if (item.turbine_id == this.turbineSeleted) {
//                 if (!setData.has(item.turbine_log_id)) {
//                   setData.add(item.turbine_log_id);
//                   this.alarms = [item, ...this.alarms];
//                 }
//               }
//             }
//           }
//         }).catch(x => console.error(x))
//       });
//   }

//   initSocket1() {
//     if (!this.observe1 || this.observe1?.closed)
//       this.observe1 = this.socket1.subscribe((data: Promise<string>) => {
//         data.then(result => {
//           let object = JSON.parse(result);
//           this.countAlarms = object[0].count_warning;
//           console.log(this.countAlarms);
//         }).catch(x => console.error(x))
//       });
//   }

//   ngOnInit(): void {
//     this.turbine = [
//       {
//         'label': 'All',
//         'value': 0
//       }, {
//         'label': 'Turbine 1',
//         'value': 1
//       }, {
//         'label': 'Turbine 2',
//         'value': 2
//       }, {
//         'label': 'Turbine 3',
//         'value': 3
//       }, {
//         'label': 'Turbine 4',
//         'value': 4
//       }, {
//         'label': 'Turbine 5',
//         'value': 5
//       }, {
//         'label': 'Turbine 6',
//         'value': 6
//       }, {
//         'label': 'Turbine 7',
//         'value': 7
//       }, {
//         'label': 'Turbine 8',
//         'value': 8
//       }, {
//         'label': 'Turbine 9',
//         'value': 9
//       }, {
//         'label': 'Turbine 10',
//         'value': 10
//       }, {
//         'label': 'Turbine 11',
//         'value': 11
//       }, {
//         'label': 'Turbine 12',
//         'value': 12
//       },
//     ]
//     this.alarmServices.getAlarms("", 0).subscribe(x => {
//       this.alarms = x;
//     })
//   }

//   search(turbine_id: number) {
//     if (this.observe) {
//       this.observe.unsubscribe();
//     }
//     this.alarmServices.getAlarms(this.searchTagName, turbine_id).subscribe(x => {
//       this.alarms = x;
//       this.initSocket();
//     })
//   }

//   setAlarmOff() {
//     if (this.selectedProduct.account_id == null &&
//       (this.selectedProduct.alarm_class.trim() == 'Alarm'
//         || this.selectedProduct.alarm_class.trim() == 'Warning')) {
//       const data = {
//         ids: this.selectedProduct.turbine_log_id + ''
//       }
//       this.alarmServices.putAlarmsOff(data).subscribe(x => {
//         this.search(this.turbineSeleted);
//       })
//     }
//   }

//   setAllAlarmOff() {
//     let a: any = []
//     this.alarms.forEach(e => {
//       if ((e.alarm_class.trim().toLowerCase() == 'alarm' ||
//         e.alarm_class.trim().toLowerCase() == 'warning') && e.account_id == null) {
//         a.push(e.turbine_log_id)
//       }
//     });
//     let temp = a.join(",");
//     const data = {
//       ids: temp
//     }
//     this.alarmServices.putAlarmsOff(data).subscribe(x => {
//       this.search(this.turbineSeleted);
//     })
//   }

//   redNotice(alarms: any): string {
//     if ((alarms.alarm_class.trim().toLowerCase() == 'alarm' ||
//       alarms.alarm_class.trim().toLowerCase() == 'warning') && alarms.account_id == null) {
//       return "background: red; color: black; ";
//     } else {
//       return "background: #2b2929; ";
//     }
//   }

//   onRowSelect(event: Event) {
//     this.showBasicDialog()
//   }

//   showBasicDialog() {
//     this.displayBasic = true;
//   }
// }
