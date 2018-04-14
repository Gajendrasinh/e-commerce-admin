import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../../common/commonComponent'


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {

  constructor(inj:Injector) {
    super(inj)
  }
  public passdata : any = {}
  ngOnInit() {
  }

  public submitted:boolean = false;
  changePassword(form){
  	this.submitted = true;
    if(form.valid){
      console.log("Password Form : ", form.value)
      if(form.value.newPassword !== form.value.confirmPassword){
         this.popToast('error', "New password & Confirm password not matched")
         form.reset();
         this.submitted = false;
         return 0;
      }
      
      this.commonService.callApi('adminChangePassword', form.value, 'post').then(success=>{
        if(success.status == 1){
          this.popToast('success',success.message)
        }else{
          this.popToast('error', success.message)
        }
      })
    }
  	
  }

}
