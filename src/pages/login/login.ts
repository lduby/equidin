import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfilePage } from '../../pages/profile/profile';
import { ProfileUpdatePage } from '../../pages/profile-update/profile-update';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
    })
export class Login {

    loginParams: any = {};
    registrationParams: any = {};
    user = "";
    
    constructor(public navCtrl: NavController, private auth: AuthService) {
        console.log('Login Component');  
// Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserProfile');
    }
    
    public register() {
        console.log("Processing registration for "+this.registrationParams.licence+":"+this.registrationParams.email+":"+this.registrationParams.password);
        this.auth.signup(this.registrationParams.licence,this.registrationParams.email,this.registrationParams.password).subscribe(data => {  
            this.user = JSON.stringify(data);
            console.log(this.user);
            if (data.licence!=="") {
                console.log("Success ! Account created for licence "+this.registrationParams.licence);
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', this.user);
                this.navCtrl.push(ProfileUpdatePage, {
                    licence: this.registrationParams.licence
                });
            } else {
                console.log("Error ! Problem creating account.");
            }
        },
        error => {
            console.log(error);
        });
    }
    
    
    public authenticate() { 
    console.log("Processing authentication for "+this.loginParams.licence+":"+this.loginParams.password);
        this.auth.signin(this.loginParams.licence,this.loginParams.password).subscribe(data => {    
                    this.user = JSON.stringify(data);
                    console.log(this.user);
                    if (data.licence!=="") {
                        console.log("Successfully signed in.");
                        // store user details in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', this.user);
                        this.navCtrl.push(ProfilePage, {
                            licence: this.loginParams.licence
                        });
                    } else {
                        console.log("Error ! No licence number in response.");
                    }
            },
            error => {
                console.log(error);
            });
    
    }
    
 
}
