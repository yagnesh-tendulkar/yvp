import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, private service:UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
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
      this.service.register(this.userForm.value).subscribe((res)=>{
        console.log(res)
      })
      this.submitted = true;
    }
  }
}
