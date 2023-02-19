import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ui';
    
    constructor(private router: Router,private service: UserService) {}
  logout() {
    this.router.navigateByUrl('/');
  }
  navigate(route: string){
    this.router.navigateByUrl('/'+route)

  }
}
