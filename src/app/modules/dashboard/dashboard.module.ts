import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.modules';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';


const COMPONENTS = [
  DashboardComponent,
];

const MODULES = [DashboardRoutingModule, SharedModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
})
export class DashboardModule { }
