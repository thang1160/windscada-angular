import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {

  // <th style="min-width:20%">Time</th>
  // <th style="min-width:20%">Signal_Name</th>
  // <th style="min-width:20%">OPC_Tag_Name</th>
  // <th style="min-width:20%">Alarm_Class</th>
  // <th style="min-width:20%">Description</th>
  public cars = [
    {
      "time": "1",
      "signalName": "a",
      "tagName": "a",
      "alarmClass": "a",
      "des": "a",
    },{
      "time": "2",
      "signalName": "b",
      "tagName": "b",
      "alarmClass": "b",
      "des": "b",
    },{
      "time": "3",
      "signalName": "c",
      "tagName": "c",
      "alarmClass": "c",
      "des": "c",
    },{
      "time": "4",
      "signalName": "d",
      "tagName": "d",
      "alarmClass": "d",
      "des": "d",
    }
  ];
  public selectedProduct2: any
  constructor() { }

  ngOnInit(): void {
  }

  onRowUnselect(event: Event) {

  }

  onRowSelect(event: Event) {
    console.log(event);
    console.log(this.selectedProduct2);
  }

}
