import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';

@Injectable()
export class AuthService {
    
    apiUrl = "http://localhost:3000/";

    constructor(public http: Http) {
        console.log('Hello AuthService Provider');  
    }
     
    signin(licence: string, password: string)  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("Service is asking for auth with "+licence+":"+password);
        return this.http.post('http://localhost:3000/auth/sign_in', JSON.stringify({ licence: licence, password: password }), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    
    signup(licence: string, email: string, password: string)  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("Service is asking for registration with "+licence+":"+email+":"+password);
        return this.http.post('http://localhost:3000/auth', JSON.stringify({ licence: licence, email: email, password: password }), options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    
    signout(){
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    
    private handleError (error: Response) {
        console.error(error);
            return Observable.throw(error.json().error || ' error');
    }

}
