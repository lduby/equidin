import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AuthService } from '../providers/auth-service';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { HorsePage } from '../pages/horse/horse';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { User } from '../models/user';
import { Profile } from '../models/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

//  rootPage: any = Page1;
    rootPage: any = LoginPage;
    currentUser: User;
    currentUserName: string = "";

  pages: Array<{title: string, component: any}>;

constructor(public platform: Platform, private authSrv: AuthService, public menu: MenuController, private events: Events) {
    console.log("App constructor");
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Profile', component: ProfilePage },
        { title: 'Search', component: SearchPage }
    ];
      
    // redirects to profile directly if user already logged in  
    let user = JSON.parse(localStorage.getItem('currentUser'));  
    if (user!==null) {
        console.log("User already connected");
        let user_id = +localStorage.getItem('currentUser');
        this.currentUser = new User(user_id,localStorage.getItem('currentLicence'),localStorage.getItem('currentMail'), null);
        let profile = JSON.parse(localStorage.getItem('currentUserProfile'));
        console.log("User profile: "+profile);
//        if (profile!==null) {
//            this.currentUser.setProfile(new Profile(profile,profile.name,profile.phone,profile.address,profile.about,profile.picture,profile.riding_level*1,profile.user_id*1))
//        }
        this.currentUserName = localStorage.getItem('currentUserName');
    //this.currentUserStr = localStorage.getItem('currentUserProfile'); // Ne recupère que le numéro du profil
        //this.rootPage = ProfilePage;
        this.rootPage = HomePage;
    } 
    else {
        console.log("No user connected");
        this.rootPage = LoginPage;
    }
    
    this.listenToLoginEvents();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
    
  listenToLoginEvents() {
      this.events.subscribe('user:login', (user) => {
        console.log("Event received for login the user "+user.id);
          this.updateMenu(true, user);
      });
    this.events.subscribe('user:signup', (user) => {
        console.log("Event received for signup the user "+user.id);
          this.updateMenu(true,user);
      });
    this.events.subscribe('user:logout', () => {
        console.log("Event received for logout the current user");
          this.updateMenu(false,null);
      });
  }
    
updateMenu(loggedIn: boolean, user: User) {
        if (loggedIn) { 
            this.currentUserName = localStorage.getItem('currentUserName');
            this.currentUser = user;
        } else {
            this.currentUserName = "";
            this.currentUser = new User(0,"","",new Profile(0,"","","","","",0,0));
        }
        
    }
    
  logout() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        // Remove user connection to the database
        this.authSrv.signout(user.licence, user.id);
        this.nav.setRoot(LoginPage);
        this.menu.close();
            /*.subscribe(data => {    
                let answer = JSON.stringify(data);
                console.log("Disconnection response: "+answer);
                if (data.id!=="") {
                    console.log("User disconnected.");
                    this.nav.setRoot(LoginPage);
                } else {
                    console.log("Error ! Problem occured while disconnecting.");
                }
            },
            error => {
                console.log(error);
            }
        );*/
    }
}
