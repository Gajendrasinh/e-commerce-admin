import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from '../../common/commonComponent'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  token:any;
  message:string;
  successFlag:boolean=false;
  constructor(inj:Injector) {
  	super(inj);
    this.token = this.router.parseUrl(this.router.url).queryParams["token"];
  }

  ngAfterViewInit(){
      console.log('Token ', this.token)
  }

  ngOnInit() {
  }

  /****************************************************************/
  // Change Password
  /****************************************************************/
  public confPassword1;
  public passdata: any = {}
  public submitted:boolean = false;
  onChangePassword(passwordForm, passdata){
    this.submitted = true;
    if(passwordForm.valid){

        if(passdata.password != passdata.confPassword){
          this.popToast('error','New Password and confirm password must be same.')
          return false 
        }
        
        let data = {
          token : this.token,
          password : passdata.password,
          confirmPassword:passdata.confPassword,
        }

        console.log('pass data ', data)
        this.commonService.callApi('adminResetPassword', data, 'post').then(success => {
          if(success.status == 1){
            this.popToast('success',success.message)
            this.router.navigate(["/login"]);
          }else{
            this.popToast('error', success.message)
          }
          console.log('profile success : ', success)          
        })
    }else{
        this.popToast('error','Please complete the password form.')
    }
  }
  /****************************************************************/

}

