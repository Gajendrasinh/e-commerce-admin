import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../../common/commonComponent';

import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(inj:Injector, private socialAuthService: AuthService) {
  	super(inj)
  }
  public user:any = {}

  ngOnInit() {
    
  }

  showForgotPassword(){
    this.swal({
      title: 'Forgot Password',
      text:"Please enter the registered email id. You will receive reset password link.",
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('call the api: ', email)
            let data = {
              email : email
            }
            this.commonService.callApi('adminForgotPassword', data, 'post').then(success=>{resolve(success)} )
          }, 500)
        })
      },
      allowOutsideClick: () => !this.swal.isLoading()
    }).then((result) => {
      console.log('result after api call : ', result.value)
      if(result.value){
          if (result.value.status) {
            this.swal({
              type: 'success',
              title: 'Link Sent',
              html: result.value.message
            })
          }else{
            this.swal({
              type: 'error',
              title: 'Error',
              html: result.value.message
            })
          }
      }
    })  
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
      }
    );
  }


  onLogin(form, user){
    if(form.valid){
      this.commonService.loading(true);
      this.commonService.callApi('adminLogin', user, 'post', false, true).then(success=>{
        if(success.status == 1){          
          this.commonService.success(success.message);
          this.setToken('accessToken', success.access_token);
          this.setToken('userdetail', JSON.stringify(success.data));
          this.router.navigate(["/main"]);          
        }else{
          this.popToast('error',success.message)
        }
        this.commonService.loading(false);
      })
    }else{
      this.popToast('error','Please provide complete information.')
    }
  }

}
