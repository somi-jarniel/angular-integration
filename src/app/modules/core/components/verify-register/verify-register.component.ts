import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VerifyRegistrationModel } from 'src/app/modules/shared/models/verify-registration.model';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private router: Router,
    private origin: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    let email = null;
    this.origin.queryParams.subscribe(res => {
      if(res.email) {
        email = res.email;
      } else {
        this.router.navigate(['/login']);
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
    
    this.authService.verify(verifyModel)
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

    this.authService.resendVerificationEmail(values.email)
    .subscribe(() => {
      this.isLoadingResults = false;
    }, error => {
      this.isLoadingResults = false;
    });
  }
}
