import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { SpinnerService } from './services/spinner.service';
import { UIService } from './services/ui.service';
import { AuthService } from '../modules/auth/auth.service';
import { LocalStorageService } from './services/local-storage.service';

const SERVICES = [
    SpinnerService,
    UIService,
    AuthService,
    LocalStorageService
];

@NgModule({
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    // Import guard
    if (parentModule) {
      throw new Error(
        `${parentModule} has already been loaded. Import Core module in the AppModule only.`,
      );
    }
  }
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [...SERVICES],
    };
  }
}