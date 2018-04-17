import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public copyYear:any;
  public copyName: string;

  constructor() { }

  ngOnInit() {
    this.copyName = "Gajendrasinh Zala";
    var date = new Date();
    this.copyYear = date.getFullYear();
  }

}
