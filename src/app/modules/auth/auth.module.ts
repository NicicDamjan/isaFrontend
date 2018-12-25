import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';

const COMPONENTS = [
  AuthComponent,
  SignInComponent,
  SignUpComponent,
  ConfirmEmailComponent,
];

const MODULES = [AuthRoutingModule, SharedModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS, ConfirmEmailComponent],
})
export class AuthModule {}
