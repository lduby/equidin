import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user'
import { Profile } from '../models/profile'

@Injectable()
export class UserService {

    apiUrl = "http://localhost:3000/";
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http) {
        console.log('Hello UserService Provider');
    }
    
    getUserProfile(id: number) {
//        return this.http.get(this.apiUrl+'profiles/'+id, this.options).map((response: Response) => response.json()).catch(this.handleError);
            return this.http.get(this.apiUrl+'profiles/'+id, this.options).map(this.extractData).catch(this.handleError);
    }
    
    /*getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }*/

    /*getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/

    createProfile(profile: Profile) {
            //return this.http.post(this.apiUrl+'profiles', profile, this.options).map((response: Response) => response.json()).catch(this.handleError);
            return this.http.post(this.apiUrl+'profiles', profile, this.options).map(this.extractData).catch(this.handleError);
    }

    updateProfile(profile_id: number, profile: Profile) {
            return this.http.put(this.apiUrl+'profiles/' + profile_id, profile, this.options).map((response: Response) => response.json()).catch(this.handleError);
    }
    
    /*updateUser(user: User) {
            return this.http.put(this.apiUrl+'/api/users/' + user.id, user, this.options).map((response: Response) => response.json()).catch(this.handleError);
    }*/

    /*delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }*/

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
                return new RequestOptions({ headers: headers });
        }
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

