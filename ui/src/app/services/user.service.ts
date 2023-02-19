import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  islogin=false
    
    constructor(private http: HttpClient,private notification: NzNotificationService) { }
  register(data:any) {
    return this.http.post(environment.hostURL + "user", data)
  }
  getUsers(){
    return this.http.get(environment.hostURL + "user")
  }
  exportUsers(filterData){
    return environment.hostURL + "user/export"+filterData
  }
  getUserByFilter(from, to){
    return this.http.get(environment.hostURL + "user/search/"+from+"/"+to)
  }

  showNotification(title,text){
    this.notification
    .blank(
      title,
      text
    )
  }
}
