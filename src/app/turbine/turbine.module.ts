import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurbineAlarmComponent } from './turbine-alarm/turbine-alarm.component';
import { SharedModule } from '../shared/shared.module';
import { TurbineRoutingModule } from './turbine-routing.module';


@NgModule({
  declarations: [
    TurbineAlarmComponent
  ],
  imports: [
    CommonModule,
    TurbineRoutingModule,
    SharedModule,
  ]
})
export class TurbineModule { }
