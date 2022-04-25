import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { VerifyRegistrationModel } from 'src/app/modules/shared/models/verify-registration.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-verify-register',
  templateUrl: './verify-register.component.html',
  styleUrls: ['./verify-register.component.scss']
})
export class VerifyRegisterComponent implements OnInit {

  // @ts-ignore
  verifyForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private origin: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    let email = null;
    this.origin.queryParams.subscribe(res => {
      if(res.email) {
        email = res.email;
      }
    });
    this.verifyForm = this.formBuilder.group({
      'email': [email, [Validators.required, Validators.email]],
      'token': [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    let values = this.verifyForm.value;

    let verifyModel: VerifyRegistrationModel = new VerifyRegistrationModel(
      values.email,
      values.token
    );
    
    this.loginService.verify(verifyModel)
      .subscribe(() => {
        this.isLoadingResults = false;
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      });
  }

  resendVerificationEmail(): void {
    this.isLoadingResults = true;
    let values = this.verifyForm.value;

    this.loginService.resendVerificationEmail(values.email)
    .subscribe(() => {
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }
}
