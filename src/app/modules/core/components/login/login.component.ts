import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginModel} from "../../../shared/models/login.model";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    let values = this.loginForm.value;

    let loginModel: LoginModel = new LoginModel(values.username, values.password);
    
    this.authService.login(loginModel)
      .subscribe(() => {
        this.isLoadingResults = false;
        this.router.navigate(['']).then(_ => console.log('logged in successfully'));

      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      }
    )
  }

}
