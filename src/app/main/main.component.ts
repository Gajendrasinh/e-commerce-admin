import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../common/commonComponent';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements  OnInit {

  public sideMenuItem: any = [
    {title : "Dashboard", icon: 'fa-tachometer-alt', url: 'dashboard'},
    {title : "Profile", icon: 'fa-user', url: 'dashboard1'}
  ]
  ngOnInit() {
  }

}
