import { Component, OnInit, Input, OnChanges, TemplateRef } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-dashboard-template1',
    templateUrl: './templat1.component.html',
    styleUrls: ['../dashboard.component.scss']
})
export class Templat1Component implements OnInit, OnChanges {
    @Input() modeldata: any;
    public finalSignature: any = {};

    constructor(
    ) { }

    ngOnInit() {
        this.finalSignature = this.modeldata;
    }

    ngOnChanges() {
        this.finalSignature = this.modeldata;
    }


}
