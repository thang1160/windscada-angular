import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from '../class/TurbineLog';

@Component({
  selector: 'app-performance-data',
  templateUrl: './performance-data.component.html',
  styleUrls: ['./performance-data.component.scss']
})
export class PerformanceDataComponent implements OnInit {

  public overviewList: TurbineLog[] = [];
  private observe: Subscription | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  socket = webSocket({
    url: "ws://localhost:8889/overview",
    deserializer: (e) => e.data.text()
  });

  initSocket() {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: TurbineLog[] = JSON.parse(result);
          console.log("aaaaaaaaaa");
          console.log(array);
          this.overviewList = array;
        }).catch(x => console.error(x))
      });
  }

  ngAfterViewInit(): void {
    this.initSocket();
  }

  wrapperHeight = 0;
  getScrollHeight(pTable: Table) {
    if (!this.wrapperHeight) {
      let wrapper: HTMLDivElement = pTable.el.nativeElement.closest('.component-content');
      this.wrapperHeight = wrapper.clientHeight;
    }
    return this.wrapperHeight - 76 + 'px';
  }

}
