import { Component } from '@angular/core';

import { Events, NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UserService } from '../../providers/user-service';
import { HomePage } from '../../pages/home/home';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';
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
    
    constructor(public navCtrl: NavController, private auth: AuthService, private userSrv: UserService, private alertCtrl: AlertController, private events: Events) {
        console.log('Login Component');  
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
                    localStorage.setItem('currentUser', response.data.id);
                    localStorage.setItem('currentUserLicence', response.data.licence);
                    localStorage.setItem('currentUserMail', response.data.email);
                    // redirects to Profile Page
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
                this.showPopup("Error", error._body);
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
                let headers = JSON.stringify(response.headers);
                console.log(this.user);
                console.log(headers);
                if (response.data.licence!=="") {
                    this.createSuccess = true;
                    console.log("Successfully signed in.");
                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', response.data.id);
                    localStorage.setItem('currentUserLicence', response.data.licence);
                    localStorage.setItem('currentUserMail', response.data.email);
                    // gets user profile
                    let userid = response.data.id;
                    this.userSrv.getUserProfile(userid).subscribe(data => { 
                        if (data.id!=="") {
                            console.log("Profile Info for User "+userid);
                            console.log(data.id + ":" + data.attributes.name + ":" + data.attributes.phone + ":" + data.attributes.address + ":" + data.attributes.about + ":" + data.attributes.picture + ":" +        data.attributes.riding_level + ":" + userid);
                            let user_profile = new Profile(data.id,data.attributes.name,data.attributes.phone,data.attributes.address,data.attributes.about,data.attributes.picture, data.attributes.riding_level, userid);
                            if (user_profile !== null) {
                                console.log("Profile OK");
                                // store profile details in local storage to keep user logged in between page refreshes
                                localStorage.setItem('currentUserName', user_profile.name);
                                localStorage.setItem('currentUserProfile', JSON.stringify(user_profile));
                                this.events.publish('user:login',new User(userid,response.data.licence,response.data.email, user_profile));
                            }
                            else {
                                console.log("Profile NOT OK");
                            }
                        } else {
                            console.log("Error ! No profile in response.");
                        }
                    },
                    error => {
                        console.log(error);
                    });
                    // redirects to Profile Page
                    /*this.navCtrl.setRoot(ProfilePage, {
                        licence: this.loginParams.licence
                    });*/
                    this.navCtrl.setRoot(HomePage);
                } else {
                    console.log("Error ! No licence number in response.");
                    this.showPopup("Error !", "No licence number in response.");
                }
            },
            error => {
                console.log(error);
                this.showPopup("Error", error._body);
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
