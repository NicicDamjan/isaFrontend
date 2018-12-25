import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HermesComponent } from './hermes.component';
import { HermesRoutingModule } from './hermes-routing.module';

const COMPONENTS = [
  HermesComponent
];

const MODULES = [
  CommonModule,
  SharedModule,
  HermesRoutingModule
];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS ],
})
export class HermesModule {}
