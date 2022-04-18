import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginModel} from "../../../shared/models/login.model";
import {ApiService} from "../../services/api.service";

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
    private apiService: ApiService,
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
        this.router.navigate(['/workspace']).then(_ => console.log('logged in successfully'));

      }, error => {
        console.log(error);
        this.isLoadingResults = false;
      }
    )
  }

}
