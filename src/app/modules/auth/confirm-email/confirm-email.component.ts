import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { AuthService } from '../auth.service';
import { User } from '../../../shared/models/user.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
public token: string;
  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private spinnerWrapper: SpinnerService,
    private translateService: TranslateService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,

  ) { }

  ngOnInit() {
    this.token = this.activeRoute.snapshot.paramMap.get('token');
    this.confirmEmail();
  }

  async confirmEmail() {
    this.toastService.info(await this.translateService.get('AUTH.PROCESSING_CONFIRM').toPromise(),
    await this.translateService.get('MESSAGES.WAIT').toPromise());
    this.spinnerWrapper.registreLoader(
      this.authService
        .confirmEmail(this.token)
        .toPromise()
        .then(async data => {
          this.toastService.clear();
          this.toastService.success(await this.translateService.get('AUTH.SUCCESSFULLY_CONFIRMED_EMAIL').toPromise(),
            `${await this.translateService.get('AUTH.WELCOME').toPromise()}`);
          this.route.navigateByUrl('sign-in');
        })
        .catch(
          async (error) => {
            this.toastService.error(await this.translateService.get('AUTH.ERROR_IN_PROCESS').toPromise(),
              await this.translateService.get('MESSAGES.ERROR').toPromise());
          }),
    );
    this.spinnerWrapper.showSpinner()


  }





}
