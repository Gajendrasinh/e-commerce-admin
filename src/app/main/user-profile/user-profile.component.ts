import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../../common/commonComponent';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent  extends BaseComponent implements OnInit {

  public userDetail:any;
  public isEdit:boolean = true;

  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (this.commonService.checkLogin()) {
    }
    this.userDetail = this.commonService.getUserData();
  }

  updateProfile(form, user){
    if(form.valid){

    }else{

    }
  }

}
