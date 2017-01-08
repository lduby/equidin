import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';

import { Horse } from '../horse/horse';

@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
    })
export class ProfilePage {
    licence: string = "";
    email: string = "";
    user_id: number = null;
    user_profile: string = "";
    name: string = "";
    phone: string = "";
    address: string = "";
    about: string = "";
    picture: string = "";
    riding_level: number = null;

constructor(public navCtrl: NavController, private navParams: NavParams, private userSrv: UserService) {
    //this.licence = navParams.get("licence");
    console.log("Licence = "+navParams.get("licence"));
    let user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("Local Storage User Licence = "+user.data.licence);
    this.licence = user.data.licence;
    this.email = user.data.email;
    this.user_id = user.data.id;
    // Getting profile info
    this.userSrv.getUserProfile(this.user_id).subscribe(data => {    
        this.user_profile = JSON.stringify(data);
        console.log("Matching Profile: "+this.user_profile);
        if (data.id!=="") {
            console.log("Profile Info OK.");
            this.name = data.name;
            this.phone = data.phone;
            this.about = data.about;
            this.address = data.address;
            this.picture = data.picture;
            this.riding_level = data.riding_level;
            // store user details in local storage to keep user logged in between page refreshes
            //localStorage.setItem('currentUser', this.user);
        } else {
            console.log("Error ! No profile in response.");
        }
    },
    error => {
        console.log(error);
    });
  }

}
