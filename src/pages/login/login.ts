import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfilePage } from '../../pages/profile/profile';
import { ProfileUpdatePage } from '../../pages/profile-update/profile-update';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
    })
export class LoginPage {
    createSuccess = false;
    loginParams: any = {};
    registrationParams: any = {};
    user = "";
    
    constructor(public navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController) {
        console.log('Login Component');  
// Remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserProfile');
    }
    
    public register() {
        console.log("Processing registration for "+this.registrationParams.licence+":"+this.registrationParams.email+":"+this.registrationParams.password);
        this.auth.signup(this.registrationParams.licence,this.registrationParams.email,this.registrationParams.password).subscribe(
            response => { 
                console.log("Response: "+JSON.stringify(response)); 
                this.user = JSON.stringify(response);
                console.log(this.user);
                if (response.data.id!==null) {
                    this.createSuccess = true;
                    console.log("Success ! Account created for licence "+this.registrationParams.licence);
                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', this.user);
                    this.navCtrl.setRoot(ProfileUpdatePage, {
                        licence: this.registrationParams.licence
                    });
                } else {
                    console.log("Error ! Problem creating account.");
                    this.showPopup("Error !", "Problem creating account.");
                }
            },
            error => {
                console.log(error);
                this.showPopup("Error", error);
            }
        );
    }
    
    
    public authenticate() { 
        console.log("Processing authentication for "+this.loginParams.licence+":"+this.loginParams.password);
//        let authResponse = this.auth.signin(this.loginParams.licence,this.loginParams.password);
//        console.log(authResponse);
        this.auth.signin(this.loginParams.licence,this.loginParams.password).subscribe(
            response => {  
                    console.log("Response: "+JSON.stringify(response));
                    this.user = JSON.stringify(response.data);
                    console.log(this.user);
                    if (response.data.licence!=="") {
                        this.createSuccess = true;
                        console.log("Successfully signed in.");
                        // store user details in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', this.user);
                        this.navCtrl.setRoot(ProfilePage, {
                            licence: this.loginParams.licence
                        });
                    } else {
                        console.log("Error ! No licence number in response.");
                        this.showPopup("Error !", "No licence number in response.");
                    }
            },
            error => {
                console.log(error);
                this.showPopup("Error", error);
            }
        );
    
    }
    
    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                }
            ]
        });
        alert.present();
    }
    
 
}
