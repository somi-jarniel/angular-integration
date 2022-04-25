import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { LoginService } from '../../services/login.service';
import {Router} from "@angular/router";
import {LoginModel} from "../../../shared/models/login.model";

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
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true;
    let values = this.loginForm.value;

    let loginModel: LoginModel = new LoginModel(values.username, values.password);
    
    this.loginService.login(loginModel)
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
