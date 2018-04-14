import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from './../../common/commonComponent';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @ViewChild('signInModal') public modal: ModalDirective;
  public reqModel: any = {};
  public isLogin: Boolean = false;
  public userDetail: any = {};
  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (this.commonService.checkLogin()) {
      this.isLogin = true;
    }
    this.userDetail = this.commonService.getUserData();
  }


  onSignUp(form, user) {
    if (form.valid) {
      const queryParams = 'name=' + user.username + '&email=' + user.email + '&password=' + user.password;
      this.commonService.callApi('signup?&' + queryParams, {}, 'post', false, true).then(success => {
        console.log(success);
        this.reqModel = {};
        if (success.settings.success == 1) {
          document.getElementById('closesignupmodel').click();
          const userDetail = {
            id: success.data[0].insert_id,
            name: user.username,
            email: user.email
          };
          this.setToken('userdetail', JSON.stringify(userDetail));
          this.commonService.loginRequest.emit(true);
          this.checkLoginStatus();
        } else {
          this.popToast('error', success.message);
        }
      });
    } else {
      this.popToast('error', 'Please provide complete information.');
    }
  }

  onLogin(form, user) {
    console.log(user);
    if (form.valid) {
      console.log(user);
      const queryParams = 'email=' + user.email + '&password=' + user.password;
      console.log(queryParams);
      this.commonService.callApi('login?&' + queryParams, {}, 'post', false, true).then(success => {
        this.reqModel = {};
        console.log(success);
        if (success.settings.success == 1) {
          document.getElementById('closesigninmodel').click();
          this.setToken('userdetail', JSON.stringify(success.data[0]));
          this.commonService.loginRequest.emit(true);
          this.checkLoginStatus();
        } else {
          this.popToast('error', success.message);
        }
      });
    } else {
      this.popToast('error', 'Please provide complete information.');
    }
  }

  onLogOut() {
    this.logout();
    this.userDetail = {};
    this.isLogin = false;
    this.commonService.loginRequest.emit(false);
  }
}
