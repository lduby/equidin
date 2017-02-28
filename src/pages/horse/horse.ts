import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Horse } from '../../models/horse';

@Component({
  selector: 'page-horse',
  templateUrl: 'horse.html'
})
export class HorsePage {
    horse: Horse;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.horse = navParams.get("horse");
    }

}
