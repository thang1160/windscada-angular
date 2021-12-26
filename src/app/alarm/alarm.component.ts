import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AlarmServices } from '../service/alarm.service';
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {


  public cars = [];
  public searchTagName: string = "";

  displayBasic: boolean = false;
  public selectedProduct: any
  dialogRef: any;

  constructor(public dialog: MatDialog, public alarmServices: AlarmServices) { }


  ngOnInit(): void {
    this.alarmServices.getAlarms("").subscribe(x => {
      console.log(x)
      this.cars = x;
    })
  }

  search() {
    this.alarmServices.getAlarms(this.searchTagName).subscribe(x => {
      console.log(x)
      this.cars = x;
    })
  }

  redNotice(alarmClass: string): string {
    if (alarmClass.trim() == 'Alarm' || alarmClass.trim() == 'Warning') {
      return "border: 1px solid #ffffff; background: red; color: black; min-width:20%";
    } else {
      return "border: 1px solid #ffffff; background: #2b2929; min-width:20%";
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
