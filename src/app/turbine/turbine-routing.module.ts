import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurbineAlarmComponent } from './turbine-alarm/turbine-alarm.component';

const routes: Routes = [
  {
    path: 'turbine/alarm',
    component: TurbineAlarmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurbineRoutingModule { }
