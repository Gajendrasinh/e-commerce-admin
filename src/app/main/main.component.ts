import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './../common/commonComponent';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements  OnInit {

  ngOnInit() {
  }

}
