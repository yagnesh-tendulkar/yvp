import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder,  private router: Router, private service:UserService) { }

  ngOnInit() {
    if(this.service.islogin){
      this.userForm = this.formBuilder.group({
        name: ["", Validators.required],
        _id: ["", [Validators.required, Validators.email]],
        phoneNumber: [
          "",
          [
            Validators.required,
            Validators.pattern(/[0-9]{10}/),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        amount: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(10),
          ],
        ],
      });
  }else{
    this.router.navigateByUrl('/')
  }
  }
  get f() {
    return this.userForm.controls;
  }


  onSubmit() {    
    console.log(this.userForm.value, this.f.name.errors)
    if (this.userForm.invalid) {
      return;
    }
    else{
      this.service.register(this.userForm.value).subscribe((res:any)=>{
        console.log(res)
        this.service.showNotification("Info",res.msg)
        this.router.navigateByUrl("/successfull")
      })
      this.submitted = true;
    }
  }
}
