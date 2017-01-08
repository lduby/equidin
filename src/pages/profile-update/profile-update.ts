import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ProfilePage } from '../../pages/profile/profile';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';

@Component({
    selector: 'page-profile-update',
    templateUrl: 'profile-update.html'
})
export class ProfileUpdatePage {
    
    licence: string = "";
    email: string = "";
    username: string = "";
    user_id: number = null;
    profile_id: number = null;
    profileParams: any = {};
    profile: Profile = null;
    user: User = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userSrv: UserService) {
        let currentuser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Local Storage User Id = "+JSON.parse(localStorage.getItem('currentUser')).data.id);
        this.user = new User(currentuser.data.id, currentuser.data.licence, currentuser.data.email);
//        this.licence = user.data.licence;
//        this.email = user.data.email;
//        this.user_id = user.data.id;
      }

    ionViewDidLoad() { 
        console.log('ionViewDidLoad ProfileUpdatePage');
    }
    
    updateProfile() {
        console.log("Processing profile update");
        // Getting form params
        this.profile = new Profile(null,this.profileParams.name,this.profileParams.phone,this.profileParams.address,this.profileParams.about, "", this.profileParams.riding_level, this.user.id )
//        this.profile.user_id = this.user_id;
//        if (this.profileParams.name!=="") { this.profile.name = this.profileParams.name; }
//        if (this.profileParams.riding_level!=="") { this.profile.riding_level = this.profileParams.riding_level; }
//        if (this.profileParams.phone!=="") { this.profile.phone = this.profileParams.phone; }
//        if (this.profileParams.address!=="") { this.profile.address = this.profileParams.address; }
//        if (this.profileParams.about!=="") { this.profile.about = this.profileParams.about; }
        // If the profile exists, it has been stored in localStorage
        let userprofile = JSON.parse(localStorage.getItem('currentUserProfile'));
        this.profile_id = userprofile;
        if (userprofile !== null && userprofile!=="") {
            // The user profile already exists
            this.userSrv.updateProfile(this.profile_id,this.profile).subscribe(data => {  
                let updatedProfile = JSON.stringify(data);
                console.log(updatedProfile);
                if (data.name!=="") {
                    console.log("Success ! Profile updated.");
                    if (this.profileParams.email!==this.email) {
//                        this.user.id = this.user_id;
//                        this.user.licence = this.licence;
                        this.user.setEmail(this.profileParams.email);
                        this.userSrv.updateUser(this.user).subscribe(data => {  
                            let updatedUser = JSON.stringify(data);
                            console.log(updatedUser);
                            if (data.email===this.profileParams.email) {
                                console.log("Success ! Email updated.");
                                this.navCtrl.push(ProfilePage, {
                                    licence: this.licence
                                });
                                } else {
                                    console.log("Error ! Problem updating email.");
                                }
                            },
                            error => {
                                console.log(error);
                            }
                        );
                    }
                } else {
                    console.log("Error ! Problem updating account.");
                }
            },
            error => {
                console.log(error);
            });
        } else {
            this.userSrv.createProfile(this.profile).subscribe(data => {  
                let createdProfile = JSON.stringify(data);
                console.log(createdProfile);
                if (data.name===this.profileParams.name) {
                    console.log("Success ! Profile created.");
                    // Remove user from local storage to log user out
                    localStorage.removeItem('currentUser');
                    // Storing the user name in the local storage 
                    localStorage.setItem('currentUserProfile', data.id);
                    // Redirecting to the Profile Page
                    this.navCtrl.push(ProfilePage, {
                        licence: this.licence
                    });
                } else {
                    console.log("Error ! Problem updating email.");
                }
            },
            error => {
                console.log(error);
            });
        }
    }

}
