import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './core/security/auth.guard';

const ROUTE_MODULES = './modules';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: `${ROUTE_MODULES}/auth/auth.module#AuthModule`,
  },
  {
    path: 'hermes',
    canActivate: [AuthGuard],
    loadChildren: `${ROUTE_MODULES}/hermes/hermes.module#HermesModule`,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: `${ROUTE_MODULES}/dashboard/dashboard.module#DashboardModule`,
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
