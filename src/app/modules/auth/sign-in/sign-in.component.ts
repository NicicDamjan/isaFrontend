import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { AuthService } from '../auth.service';
import { User } from '../../../shared/models/user.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'nucleus-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  public authForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private spinnerWrapper: SpinnerService,
    private translateService: TranslateService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {
    this.authForm = this.createFormGroup();
  }

  ngOnInit() {
    this.enableAbstractControls();
  }

  /**
   * Method activated on fisnihed process for login
   * calling auth.service.ts method for comminication with API
   */
  async signIn() {
    const user = new User(this.authForm.value);
    this.toastService.info(await this.translateService.get('AUTH.PROCESSING_LOGIN').toPromise(),
    await this.translateService.get('MESSAGES.WAIT').toPromise());
    this.spinnerWrapper.registreLoader(
      this.authService
        .signIn(user)
        .toPromise()
        .then(async data => {
          this.localStorageService.setUser(new User(data.user), data.token);
          this.toastService.clear();
          this.toastService.success(await this.translateService.get('AUTH.SUCCESSFULLY_LOGGED_IN').toPromise(),
            `${await this.translateService.get('AUTH.WELCOME').toPromise()}, ${data.user.email}`);
          this.route.navigateByUrl('hermes');
        })
        .catch(
          async (error) => {
            this.toastService.error(await this.translateService.get('AUTH.ERROR_IN_PROCESS').toPromise(),
              await this.translateService.get('MESSAGES.ERROR').toPromise());
            this.authForm.controls['password'].reset();
          }),
    );
    this.spinnerWrapper.showSpinner()
  }

  /**
   * Method for building form 
   */
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      'email': [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  /**
   * Method for capturing form values
   */
  enableAbstractControls() {
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  /**
   * Triggers
   */

  /**
   * Method redirecting to sign up component
   */
  goRegister() {
    this.route.navigateByUrl('auth/sign-up');
  }

}
