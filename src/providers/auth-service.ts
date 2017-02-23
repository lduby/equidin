import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user';

@Injectable()
export class AuthService {
    
    apiUrl = "http://vks.ldjm.fr:3000/";
    response: Observable<Response>;
    
    constructor(public http: Http) {
        console.log('Hello AuthService Provider');  
    }
     
    signin(licence: string, password: string)  {
        // Defining request options
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        // Sending request 
        console.log("Service is asking for auth with "+licence+":"+password);
        
        return this.http.post(this.apiUrl+'auth/sign_in', JSON.stringify({ licence: licence, password: password }), options)
            .map((response: Response) => { 
                console.log('Headers: '+response.headers);
                localStorage.setItem("userToken", response.headers["access-token"]); 
                return response.json();
            });
//            .map((response: Response) => response.json());
//            .catch(this.handleError);
    }
    
    signup(licence: string, email: string, password: string)  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("Service is asking for registration with "+licence+":"+email+":"+password);
        return this.http.post(this.apiUrl+'auth', JSON.stringify({ licence: licence, email: email, password: password }), options)
            .map((response: Response) => { 
                console.log('Headers: '+response.headers);
                localStorage.setItem("userToken", response.headers["access-token"]); 
                return response.json();
            });
//            .map((response: Response) => response.json());
//            .catch(this.handleError);
    }
    
    signout(licence: string, user: string){
        console.log("Removing stored information");
        let token = localStorage.getItem("userToken");
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserLicence');
        localStorage.removeItem('currentUserMail');
        localStorage.removeItem('currentUserProfile');
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('currentUserThumb');
        localStorage.removeItem('userToken');
        // remove user connection to the database
        /*let headers= new Headers({ 'Content-Type': 'application/json' });
        headers.append('access-token', token);
        let options= new RequestOptions({headers:headers, method: "DELETE"});
        console.log("Service is asking for database deconnection with "+licence+":"+user);
        return this.http.delete(this.apiUrl+'auth', options)
            .map((response: Response) => response.json());*/
    }
    
    private handleError (error: Response) {
        console.error(error);
            return Observable.throw(error.json().error || ' error');
    }

    private extractData(res: Response) {
        let body = res.json();
            return body.data || { };
    }

}
