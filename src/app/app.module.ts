import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSlideToggleModule } from '@angular/material';

// Plugins
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ng2-ckeditor'; // 1. https://github.com/chymz/ng2-ckeditor // 2. https://ckeditor.com/ckeditor-4/download/
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

// Common
import { BaseComponent } from './common/commonComponent';
import { CommonService } from './common/common.service'
import { CanLoginActivate, CanAuthActivate } from './common/auth.gaurd'
import { ErrorMessages } from './common/errorMessages';


// public pages
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';

// main pages
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { IndexComponent } from './main/dashboard/index/index.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { Templat1Component } from './main/dashboard/templete1/templat1.component';
import { Templat2Component } from './main/dashboard/templete2/templat2.component';

import { ResetPasswordComponent } from './public/reset-password/reset-password.component';
import { ChangePasswordComponent } from './main/change-password/change-password.component';


// User management

// CMS Management

// ************************************************************************************************//
// @Purpose : Social Media Login//
// ************************************************************************************************//
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('147316885915455')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('125303558418-4j016lhttq89o8mic0dn8lkahf5tkhp4.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}
// ************************************************************************************************//

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    CanLoginActivate,
    CanAuthActivate,
    DashboardComponent,
    IndexComponent,
    Templat1Component,
    Templat2Component,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    NgSelectModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    MatPaginatorModule, MatSlideToggleModule,
    LoadingBarHttpClientModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    CKEditorModule,
    DataTablesModule,
    SocialLoginModule,
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'universal-demo-v5' }),
    HttpClientModule,
    BrowserTransferStateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent,  pathMatch: 'full' },
      {
        path: 'main', component: MainComponent, canActivate:[CanLoginActivate], children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },    
          { path: 'dashboard1', component: DashboardComponent, pathMatch: 'full' },        
        ]
      },
      //{ path: '**', redirectTo: '/main/dashboard', pathMatch: 'full' }
    ])
  ],
  providers: [
    CanLoginActivate, CanAuthActivate, CommonService, ErrorMessages,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
