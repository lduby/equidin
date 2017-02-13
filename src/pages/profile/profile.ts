import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { Horse } from '../horse/horse';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
    })
export class ProfilePage {
    user_service: UserService;
    licence: string = "";
    email: string = "";
    user_id: number = null;
    current_user: any;
    user_profile: any = null;

    constructor(public navCtrl: NavController, private navParams: NavParams, private userSrv: UserService) {
        this.user_service = userSrv;
        //this.licence = navParams.get("licence");
        this.licence = localStorage.getItem('currentUserLicence');
        this.email = localStorage.getItem('currentUserMail');
        this.user_id = +localStorage.getItem('currentUser');
        console.log("Profile constructor: "+this.licence + ":" + this.email + ":" + this.user_id);
    }
    
    ionViewCanEnter() {
        console.log("in ionViewCanEnter");
        return new Promise((resolve, reject) => {   
            // Getting profile info again 
            this.user_service.getUserProfile(this.user_id).subscribe(data => { 
                if (data.id!=="") {
                    console.log("Profile Info for User "+this.user_id);
                    console.log(data.id + ":" + data.attributes.name + ":" + data.attributes.phone + ":" + data.attributes.address + ":" + data.attributes.about + ":" + data.attributes.picture + ":" + data.attributes.riding_level + ":" + this.user_id);
                    this.user_profile = new Profile(data.id,data.attributes.name,data.attributes.phone,data.attributes.address,data.attributes.about,data.attributes.picture, data.attributes.riding_level, this.user_id);
                    //console.log(uprofile.id + ":" + uprofile.name + ":" + uprofile.phone + ":" + uprofile.address + ":" + uprofile.about + ":" + uprofile.picture + ":" + uprofile.riding_level + ":" + uprofile.user_id);
                    if (this.user_profile != null) {
                        console.log("Profile OK");
                        // store user details in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUserName', this.user_profile.name);
                        this.current_user = new User(this.user_id, this.email, this.licence, this.user_profile);
                        resolve(this.current_user);
                    }
                    else {
                        console.log("Profile NOT OK");
                        reject("Profile info not available");
                    }
                } else {
                    console.log("Error ! No profile in response.");
                    reject("No profile in response.");
                }
            },
            error => {
                console.log(error);
                reject(error);
            });
            
        });
    }

}
