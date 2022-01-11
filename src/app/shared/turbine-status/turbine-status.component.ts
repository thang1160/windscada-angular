import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { TurbineLog } from '../../class/TurbineLog';

@Component({
  selector: 'app-turbine-status',
  templateUrl: './turbine-status.component.html',
  styleUrls: ['./turbine-status.component.scss']
})
export class TurbineStatusComponent implements OnInit, AfterViewInit, OnDestroy {


  socket = webSocket({
    url: "ws://localhost:8888/turbine-status",
    deserializer: (e) => e.data.text()
  });

  constructor() { }
  public turbines: any = [];
  public status: any = [];
  public sites: any = [];

  public dropDown: any;
  public dropDownSelected: string = '';
  observe: Subscription | undefined;

  ngOnInit(): void {

    this.dropDown = [
      { name: 'By Status', value: 'status' },
      { name: 'By Groups', value: 'groups' },
    ]
  }

  ngAfterViewInit(): void {
    if (!this.observe || this.observe?.closed)
      this.observe = this.socket.subscribe((data: Promise<string>) => {
        data.then(result => {
          let array: TurbineLog[] = JSON.parse(result);
          let tempGroup = []
          let tempOnline = []
          let tempRepair = []
          for (const item of array) {
            tempGroup.push({ data: item })
            if (item.isDeactive) {
              tempRepair.push({ data: item })
            } else {
              tempOnline.push({ data: item })
            }
            this.groupByStatus(tempOnline, tempRepair);
            this.groupBySite(tempGroup);
            this.groupByTurbine(array)
          }
        }).catch(x => console.error(x))
      });
  }

  groupByTurbine(data: any[]) {
    this.turbines = data;
  }

  groupByStatus(dataOnline: any[], dataRepair: any[]) {
    this.status = [
      {
        data: { turbine_name: 'Online (' + dataOnline.length + ')', isDeactive: '0' },
        expanded: true,
        children: dataOnline
      },
      {
        data: { turbine_name: 'Repair (' + dataRepair.length + ')', isDeactive: '1' },
        expanded: true,
        children: dataRepair
      }
    ]
  }

  groupBySite(data: any[]) {
    this.sites = [{
      data: { turbine_name: 'Group Tây Nguyên WindPower (' + data.length + ')', isDeactive: '' },
      expanded: true,
      children: data
    }]
  }

  ngOnDestroy(): void {
    if (this.observe) {
      this.observe.unsubscribe();
    }
  }

  wrapperHeight = 0;

  getScrollHeight(divElement: HTMLDivElement) {
    if (!this.wrapperHeight) {
      let wrapper: HTMLDivElement | null = divElement.closest('.component-content');
      if (wrapper) {
        this.wrapperHeight = wrapper.clientHeight;
      }
    }
    return { 'display': 'block', 'overflow-y': 'scroll', 'height': this.wrapperHeight - 58 + 'px' };
  }
}
