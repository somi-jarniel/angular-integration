import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { RegisterModel } from 'src/app/modules/shared/models/register.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // @ts-ignore
  registerForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      mobile_no: [null, [Validators.required, Validators.pattern('^(09|\\+639)\\d{9}$')]],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    let values = this.registerForm.value;

    let registerModel: RegisterModel = new RegisterModel(
      values.first_name,
      values.last_name,
      values.email,
      values.mobile_no,
      values.username,
      values.password
    );
    
    this.authService.register(registerModel)
      .subscribe(() => {
        this.isLoadingResults = false;
        this.router.navigate(['/verify-registration?email='+values.email]);
      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      });
  }
}
