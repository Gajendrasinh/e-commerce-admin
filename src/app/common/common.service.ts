import { Component, PLATFORM_ID, Injectable, NgZone, APP_ID, Inject, EventEmitter } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BaseComponent } from './../common/commonComponent';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as config from 'assets/config/configs.json';
import swal from 'sweetalert2';

@Injectable()
export class CommonService {
	loginRequest = new EventEmitter<any>();

	authorised: any = false;
	constructor(public _http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
		this.platformId = platformId;
		this._apiUrl = this.config.apiUrl;
	}

	public config = (<any>config);

	public _apiUrl;
	public platformId;

	public getToken(key) {
		if (isPlatformBrowser(this.platformId)) {
			return window.localStorage.getItem(key);
		}
	}
	public setToken(key, value) {
		if (isPlatformBrowser(this.platformId)) {
			window.localStorage.setItem(key, value);
		}
	}

	public checkLogin() {
		if (localStorage.getItem('userdetail')) {
			return true;
		}
		return false;
	}

	public getUserData() {
		if (localStorage.getItem('userdetail')) {
			const userData = JSON.parse(localStorage.getItem('userdetail'));
			return userData;
		}
		return false;
	}


    /*******************************************************************************************
	@PURPOSE      	: 	Call api.
	@Parameters 	: 	{
							url : <url of api>
							data : <data object (JSON)>
							method : String (get, post)
							isForm (Optional) : Boolean - to call api with form data
							isPublic (Optional) : Boolean - to call api without auth header 
						}
	/*****************************************************************************************/
	callApi(url, data, method, isForm?, isPublic?): Promise<any> {
		let headers;
		if (isPublic) {
			headers = new HttpHeaders({ 'content-Type': 'application/json' });
		} else {
			// headers = new HttpHeaders({ 'content-Type': 'application/json', 'auth': this.getToken('accessToken') });
		}
		if (isForm) {
			// headers = new HttpHeaders({ 'auth': this.getToken('accessToken') });
		}
		return new Promise((resolve, reject) => {
			if (method === 'post') {
				this._http.post(this._apiUrl + url, data, { headers })
					.subscribe(data => { console.log('success api call', data);  resolve(data); }, error => { this.showServerError(error); });
			} else if (method === 'get') {
				// let params: { appid: 'id1234', cnt: '5' }
				this._http.get(this._apiUrl + url, { headers })
					.subscribe(data => { resolve(data); }, error => { this.showServerError(error); });
			}
		})
	}

	/*****************************************************************************************/
	// @PURPOSE      	: 	To show server error
	/*****************************************************************************************/
	public swal = swal;
	showServerError(e) {
		this.swal({
			position: 'center',
			type: 'error',
			text: 'Internal Server Error',
			showConfirmButton: false,
			timer: 1800,
			customClass: 'custom-toaster'
		});
		console.log('Internal server error', e);
	}
	/****************************************************************************/

}


