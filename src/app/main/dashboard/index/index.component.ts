import { Component, OnInit, Input, OnChanges, TemplateRef } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-dashboard-index',
    templateUrl: './index.component.html',
    styleUrls: ['../dashboard.component.scss']
})
export class IndexComponent implements OnInit, OnChanges {

    public freelancer: Boolean = true;
    public business: Boolean = false;
    public persona: Boolean = false;
    public employee: Boolean = false;

    constructor(
    ) { }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    changeMode(key) {
        console.log(key);
        
        switch (key) {
            case 'freelancer':
                this.freelancer = true;
                this.business = false;
                this.persona = false;
                this.employee = false;
                break;
            case 'business':
            console.log(key);
            
                this.freelancer = false;
                this.business = true;
                this.persona = false;
                this.employee = false;
                break;
            case 'persona':
                this.freelancer = false;
                this.business = false;
                this.persona = true;
                this.employee = false;
                break;
            case 'employee':
                this.freelancer = false;
                this.business = false;
                this.persona = false;
                this.employee = true;
                break;
            default:
                this.freelancer = true;
                this.business = false;
                this.persona = false;
                this.employee = false;
                break;
        }
    }

}
