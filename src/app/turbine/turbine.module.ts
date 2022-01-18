import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurbineAlarmComponent } from './turbine-alarm/turbine-alarm.component';
import { SharedModule } from '../shared/shared.module';
import { TurbineRoutingModule } from './turbine-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    TurbineAlarmComponent
  ],
  imports: [
    CommonModule,
    TurbineRoutingModule,
    SharedModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    RippleModule
  ]
})
export class TurbineModule { }
