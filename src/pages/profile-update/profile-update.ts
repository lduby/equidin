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
    currentProfile: Profile = null;
    user: User = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private userSrv: UserService) {
        let currentuser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Local Storage User Id = "+JSON.parse(localStorage.getItem('currentUser')).data.id);
        this.user = new User(currentuser.data.id, currentuser.data.licence, currentuser.data.email,null);
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
        this.profile_id = userprofile.id;
        console.log("Current user = "+ this.user.id + ":" + this.user.licence + ":" + this.user.email);
        if (userprofile !== null && userprofile!=="") {
            // The user profile already exists
            this.userSrv.updateProfile(this.profile_id,this.profile).subscribe(data => {  
                let updatedProfile = JSON.stringify(data);
                console.log(updatedProfile);
                if (data.name!=="") {
                    console.log("Success ! Profile updated.");
                    this.currentProfile = new Profile(this.profile_id, data.name, data.phone,data.address,data.about,data.picture,data.riding_level*1,this.user.id*1);
                    localStorage.setItem('currentUserProfile', JSON.stringify(this.currentProfile));
                    // Redirecting to the Profile Page
                    this.navCtrl.push(ProfilePage, {
                        licence: this.user.licence
                    });
                } else {
                    console.log("Error ! Problem updating account.");
                }
            },
            error => {
                console.log(error);
            });
        } else {
            // The user profile does not exist
            console.log("Current user = "+ this.user.id + ":" + this.user.licence + ":" + this.user.email);
            this.userSrv.createProfile(this.profile).subscribe(data => { 
                console.log("Response: "+data);
                let createdProfile = JSON.stringify(data);
                console.log("Created Profile: "+createdProfile);
                this.currentProfile = new Profile(data.id, data.attributes.name, data.attributes.phone,data.attributes.address,data.attributes.about,data.attributes.picture,data.attributes.riding_level*1,this.user.id*1);
                if (data.attributes.name===this.profileParams.name) {
                    console.log("Success ! Profile "+ data.id +" created.");
                    // Remove user profile from local storage to log user out
                    localStorage.removeItem('currentUserProfile');
                    // Storing the current user profile in the local storage 
                    localStorage.setItem('currentUserProfile', JSON.stringify(this.currentProfile));
                    console.log('User = '+JSON.parse(localStorage.getItem('currentUser')).data.id);
                    // Redirecting to the Profile Page
                    this.navCtrl.push(ProfilePage, {
                        licence: this.user.licence
                    });
                } else {
                    console.log("Error ! Problem creating profile.");
                }
            },
            error => {
                console.log(error);
            });
        }
    }
    
    

}
