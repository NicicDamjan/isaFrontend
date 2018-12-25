import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HermesComponent } from './hermes.component';

/**
 * IMPORTANT!
 * Components would be REPLACE WITH MODULES!
 * This is just presenting working example!
 * @author Nicic
 */
const routes: Routes = [
  {
    path: '',
    component: HermesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HermesRoutingModule {}
