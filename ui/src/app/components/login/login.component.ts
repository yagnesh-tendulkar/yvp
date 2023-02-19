import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Routes, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      if (
        this.userForm.value.name == 'admin' &&
        this.userForm.value.password == 'adminYVP'
      ) {
        this.router.navigateByUrl('/register');
        this.submitted = true;
        this.service.islogin=true;
      }

      if (
        this.userForm.value.name == 'jishriram' &&
        this.userForm.value.password == 'JiShriRam'
      ) {
     
        this.router.navigateByUrl('/register');
        this.submitted = true;        
        this.service.islogin=true;
      }
      else{
        this.service.showNotification("Invalid Credentials","Please enter the valid credentials")
      }
    }
  }
}
