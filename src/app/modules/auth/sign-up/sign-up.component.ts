import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../core/services/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'nucleus-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  public registrationForm: FormGroup;
  public email: AbstractControl;
  public password1: AbstractControl;
  public password2: AbstractControl;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public city: AbstractControl;
  public phoneNumber: AbstractControl;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private spinnerWrapper: SpinnerService,
    private translateService: TranslateService,
    private authService: AuthService,
  ) { 
    this.registrationForm = this.createFormGroup();
  }

  ngOnInit() {
    this.enableAbstractControls();
  }

  /**
   * Method activated on fisnihed process for login
   * calling auth.service.ts method for comminication with API
   */
  async signUp() {
    console.log(this.registrationForm.value);
    const user = new User(this.registrationForm.value);
    this.toastService.info(await this.translateService.get('AUTH.PROCESSING_REGISTRATION').toPromise(),
    await this.translateService.get('MESSAGE.WAIT').toPromise());
    this.spinnerWrapper.registreLoader(
      this.authService.signUp(user)
      .toPromise()
      .then(async data => {
        this.toastService.clear();
        this.toastService.success(await this.translateService.get('AUTH.SUCCESSFULLY_SIGNED_UP').toPromise(),
        await this.translateService.get('GLOBAL.CONGRATULATION').toPromise());
        this.route.navigateByUrl('auth/sign-in');
      })
    )
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
      'password1': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      'password2': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      'firstName': [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)]),
      ],
      'lastName': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      'city': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      'phoneNumber': [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  /**
   * Method for capturing form values
   */
  enableAbstractControls() {
    this.email = this.registrationForm.controls['email'];
    this.password1 = this.registrationForm.controls['password1'];
    this.password2 = this.registrationForm.controls['password1'];
    this.firstName = this.registrationForm.controls['firstName'];
    this.lastName = this.registrationForm.controls['lastName'];
    this.city = this.registrationForm.controls['city'];
  }

  /**
   * Method redirecting to sign up component
   */
  goLogin() {
    this.route.navigateByUrl('auth/sign-in');
  }
}
