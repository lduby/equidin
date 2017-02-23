import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { AuthService } from '../providers/auth-service';
import { SearchPage } from '../pages/search/search';
import { UserService } from '../providers/user-service';
import { HorsePage } from '../pages/horse/horse';
import { HomePage } from '../pages/home/home';
import { User } from '../models/user';

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      ProfilePage,
      ProfileUpdatePage,
      HorsePage,
      SearchPage,
      HomePage              
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      LoginPage,
      ProfilePage,
      ProfileUpdatePage,
      HorsePage,
      SearchPage,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, UserService]
})
export class AppModule {}
