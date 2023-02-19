import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  search = { date: '' };
  constructor(private service: UserService) {}
  users = [];
  exportLink = '';
  filter = '';
  ngOnInit() {
    this.service.getUsers().subscribe((res: any) => {
      console.log(res);
      this.users = res;
    });
  }
  export() {
    console.log(this.filter);
    // this.service.exportUsers(this.filter);
    this.exportLink = this.service.exportUsers(this.filter);
    console.log(this.exportLink)
  }
  onChange(result: Date[]): void {
    console.log(result);
    if (result.length > 0) {
      this.filter =
        '?from=' +
        result[0].toISOString().split('T')[0] +
        '&to=' +
        result[1].toISOString().split('T')[0];
      this.service
        .getUserByFilter(
          result[0].toISOString().split('T')[0],
          result[1].toISOString().split('T')[0]
        )
        .subscribe((res: []) => {
          this.users = res;
          console.log(res);
        });
        this.export()
    } else {
      this.filter = '';
      this.export()
      this.service.getUsers().subscribe((res: any) => {
        console.log(res);
        this.users = res;
      });
    }
  }
}
