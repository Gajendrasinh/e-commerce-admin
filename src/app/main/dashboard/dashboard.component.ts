import { BaseComponent } from './../../common/commonComponent';
import { Component, OnInit, TemplateRef, Injector } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

    modalRef: BsModalRef;
    public isForm: Boolean = false;
    public frm: Boolean = true;
    public Images: Boolean = false;
    public Social: Boolean = false;
    public Design: Boolean = false;
    public reqModel: any = {};
    public finalSignature: any = {};
    public defaultArray: any = [];
    public copitext: String;
    public isFinish: Boolean = false;
    public isMessageShow: Boolean = false;
    public isLogin: Boolean = false;
    public logoFiles: any;
    public isEdit: Boolean = false;
    public isView: Boolean = false;
    constructor(private modalService: BsModalService, inj: Injector
    ) { super(inj); }

    ngOnInit() {
        this.init();
        // this.fakeData();
        this.isLogin = this.commonService.checkLogin();
        this.commonService.loginRequest.subscribe(
            (data: Boolean) => {
                console.log('emit fire');
                this.isLogin = data;
                this.formToggle(false);
                this.getAllSignature();
            });
        this.formToggle(false);
        this.getAllSignature();
    }
    init() {
        this.isForm = false;
        this.reqModel.template = '1';
        this.reqModel.font_size = '15px';
        this.reqModel.image_width = '50px';
        this.reqModel.image_shape = '0px';
        this.reqModel.size = '30px';
        this.reqModel.shape = '0px';
        this.reqModel.font_color = '#f99a3d';
    }

    openModal(lgModal: TemplateRef<any>) {
        this.modalRef = this.modalService.show(lgModal);
    }

    // For Fake Data
    fakeData() {
        this.defaultArray = [
            {
                id: 1,
                name: 'Milan Rokad',
                company: 'IndiaNIC',
                position: 'Wed Developer',
                department: 'Fron End Development',
                phone: '978423156',
                mobile: '964512347',
                whatsapp: '11122321',
                website: 'www.indianic.com',
                skype: 'milan123',
                email: 'milan.rokad@indianic.com',
                font_size: '15px',
                font_color: 'rgb(255, 72, 29)',
                backcolor: 'greed',
                img_width: '40px',
                img_shape: '5px',
                brn_width: '',
                icon_size: '30px',
                icon_shape: '5px',
                icon_color: '#fff',
                icon_backcolor: 'red',
                social_fb: 'facebook.com/milan',
                social_pinrest: 'pinrest.com/milan',
                social_tweeter: 'tweeter.com/milan',
                social_gplus: 'google.com/milan',
                social_rss: 'rss.com/milan',
                social_vimeo: 'vimeo.com/milan',
                social_drib: 'drib.com/milan',
                social_tumblr: 'tumblr.com/milan',
                social_be: 'be.com/milan',
                social_linkedin: 'linkedin.com/milan',
                social_youtube: 'youtube.com/milan',
            },
            {
                id: 2,
                name: 'John Deo',
                company: 'HP',
                position: 'Software Eng',
                department: 'IT',
                phone: '978423156',
                mobile: '964512347',
                whatsapp: '11122321',
                website: 'www.hp.com',
                skype: 'john123',
                email: 'john.deo@hp.com',
                fontsize: '15px',
                fontcolor: 'yellow',
                backcolor: 'red',
                img_width: '40px',
                img_shape: '5px',
                brn_width: '',
                icon_size: '30px',
                icon_shape: '5px',
                icon_color: '#fff',
                icon_backcolor: 'green',
                social_fb: 'facebook.com/milan',
                social_pinrest: '',
                social_tweeter: '',
                social_gplus: 'google.com/milan',
                social_rss: 'rss.com/milan',
                social_vimeo: 'vimeo.com/milan',
                social_drib: '',
                social_tumblr: '',
                social_be: 'be.com/milan',
                social_linkedin: 'linkedin.com/milan',
                social_youtube: 'youtube.com/milan',
            }
        ];

    }

    // Open Signature Form
    formToggle(value) {
        if (value) {
            this.reqModel = {};
            this.init();
        } else {
            this.reqModel = {};
        }
        this.isForm = value;
    }



    // Row Actions -> 'Edit','Delete','View'
    actions(key, data) {
        switch (key) {
            case 'edit':
                this.isEdit = true;
                this.isView = false;
                this.reqModel = data;
                this.isForm = true;
                this.reqModel.profile_pic = data.logo;
                this.reqModel.mysignature_id = data.mysignature_id;
                break;
            case 'delete':
                this.deleteSignature(data.mysignature_id);
                break;
            case 'view':
                this.reqModel = data;
                this.isFinish = true;
                this.reqModel.profile_pic = data.logo;
                this.isView = true;
                break;
            default:
                break;
        }
    }

    // ON FILE CHANGE
    getFile(e, key) {
        console.log(e.target.files);
        this.logoFiles = e.target.files[0];
        this.reqModel.logo = this.logoFiles.name;
        // console.log(e.target.result);
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.reqModel.profile_pic = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // For change form tabs
    open_evt(ev_Name) {
        switch (ev_Name) {
            case 'frm':
                this.frm = true;
                this.Images = false;
                this.Social = false;
                this.Design = false;
                break;
            case 'Images':
                this.frm = false;
                this.Images = true;
                this.Social = false;
                this.Design = false;
                break;
            case 'Social':
                this.frm = false;
                this.Images = false;
                this.Social = true;
                this.Social = true;
                this.Design = false;
                break;
            case 'Design':
                this.frm = false;
                this.Images = false;
                this.Social = false;
                this.Design = true;
                break;
            default:
                this.frm = true;
                this.Images = false;
                this.Social = false;
                this.Design = false;
                break;
        }
    }

    // set size in pixel
    setPixelProperty(key, size) {
        this.reqModel[key] = size + 'px';
    }

    // Insert new signature


    addSignature(reqData) {
        if (this.isEdit) {
            this.editSignature(reqData);
        } else {
            const formData: FormData = new FormData();
            formData.append('logo', this.logoFiles);
            reqData.users_id = this.commonService.getUserData().users_id;
            this.finalSignature = this.reqModel;
            this.isFinish = true;
            delete this.reqModel.profile_pic;
            const queryParams = this.jsonToQueryString(reqData);
            console.log(queryParams);
            this.commonService.callApi('add_mysignature?' + queryParams, formData, 'post', true, false).then(success => {
                console.log(success);
                if (success.settings.success == 1) {
                    // this.checkLoginStatus();
                    this.formToggle(false);
                    this.getAllSignature();
                    this.popToast('success', success.message);
                    this.isFinish = false;
                } else {
                    this.popToast('error', success.message);
                }
            });
        }
    }

    // Insert new signature
    editSignature(reqData) {

        const formData: FormData = new FormData();
        formData.append('logo', this.logoFiles);
        reqData.users_id = this.commonService.getUserData().users_id;
        this.finalSignature = this.reqModel;
        this.isFinish = true;
        delete this.reqModel.profile_pic;
        const queryParams = this.jsonToQueryString(reqData);
        console.log(queryParams);
        // tslint:disable-next-line:max-line-length
        this.commonService.callApi('update_mysignature?' + queryParams, this.logoFiles ? formData : {}, 'post', true, false).then(success => {
            console.log(success);
            if (success.settings.success == 1) {
                // this.checkLoginStatus();
                this.formToggle(false);
                this.isEdit = false;
                this.getAllSignature();
                this.isFinish = false;
            } else {
                this.popToast('error', success.message);
            }
        });
    }

    // Get All signature
    getAllSignature() {
        const queryParams = 'users_id=' + this.commonService.getUserData().users_id;
        console.log(queryParams);
        this.commonService.callApi('get_mysignture_listing?' + queryParams, {}, 'get', false, true).then(success => {
            console.log(success);
            if (success.settings.success == 1) {
                // this.checkLoginStatus();
                this.defaultArray = success.data;
            } else {
                this.popToast('error', success.message);
            }
        });
    }

    // Get All signature
    deleteSignature(id) {
        const queryParams = 'mysignture_id=' + id;
        console.log(queryParams);
        this.commonService.callApi('delete_mysignture?' + queryParams, {}, 'post', false, true).then(success => {
            console.log(success);
            if (success.settings.success == 1) {
                // this.checkLoginStatus();
                this.getAllSignature();
                this.popToast('success', success.message);
                this.defaultArray = success.data;
            } else {
                this.popToast('error', success.message);
            }
        });
    }


    jsonToQueryString(json) {
        return '?&' + Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');
    }

    cpoyToClip() {
        this.addSignature(this.reqModel);
        window.getSelection().selectAllChildren(document.getElementById('divTarget'));
        document.execCommand('Copy');
        this.isMessageShow = true;
        setTimeout(() => {
            this.isMessageShow = false;
        }, 4000);
    }

    viewCoptToClip() {
        window.getSelection().selectAllChildren(document.getElementById('divTarget'));
        document.execCommand('Copy');
        this.isMessageShow = true;
        setTimeout(() => {
            this.isMessageShow = false;
        }, 4000);
    }

}

