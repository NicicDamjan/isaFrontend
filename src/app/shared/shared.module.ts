import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { AuthorizedLayoutComponent } from './layouts/authorized';

const COMPONENTS = [
    MenuComponent,
    MenuItemComponent,
    AuthorizedLayoutComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxSpinnerModule,
  TranslateModule,
];

const SHARED_PROVIDERS = [
]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [...SHARED_PROVIDERS ],
    }
  }
}
