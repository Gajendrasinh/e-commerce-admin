import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../../common/commonComponent'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {

  }

}
