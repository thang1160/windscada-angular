import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurbineRoutingModule } from './turbine-routing.module';
import { SiteRoutingModule } from '../site/site-routing.module';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TurbineAlarmComponent } from './turbine-alarm/turbine-alarm.component';


@NgModule({
  declarations: [
    TurbineAlarmComponent
  ],
  imports: [
    CommonModule,
    TurbineRoutingModule,
    CommonModule,
    SiteRoutingModule,
    SharedModule,
    TableModule,
    DialogModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
  ]
})
export class TurbineModule { }
