import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Horse } from '../../models/horse';
import { HorsePage } from '../../pages/horse/horse';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    selectedItem: any;
    pictures: string[];
    items: Horse[];

    constructor(private navCtrl: NavController, public navParams: NavParams) {
        this.items = [];
        this.pictures = [];
        this.items = this.getCurrentUserHorses(+localStorage.getItem('currentUser')*1);
        for (let i = 0; i < this.items.length; i += 1) {
            this.pictures.push(this.items[i].picture);
        }
    }

    getTriples() {
        let triples = [];
        let length = this.items.length;
        for (let i = 0; i < length; i += 3) {
            let trio = [];
            trio.push(this.items[i]);
            if (i + 1 < length) {
                trio.push(this.items[i + 1]);
            } else {
                trio.push(null);
            }
            if (i + 2 < length) {
                trio.push(this.items[i + 2]);
            } else {
                trio.push(null);
            }

            triples.push(trio);
        }
        return triples;
    }
    
    getCurrentUserHorses(user_id: number) {
        let horses = [];
//        horses.push(new Horse("Nazaretheteke","assets/img/thumb-horse-2.jpg"));
//        horses.push(new Horse("Oscar","assets/img/thumb-horse-1.jpg"));
//        horses.push(new Horse("Zoey","assets/img/thumb-horse-4.jpg"));
//        horses.push(new Horse("Otto","assets/img/thumb-horse-3.jpg"));
    horses.push(new Horse(null,"Aramis","25786","female", "12/12/12","https://cdn.pixabay.com/photo/2015/10/26/01/37/horse-1006558__340.jpg","blanc","1m32","Reiterhof","Ecuries Vaillant","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre","123"));
    horses.push(new Horse(null,"Eragon","42783","male","10/02/09","https://cdn.pixabay.com/photo/2016/09/29/20/37/shire-horse-1703729__340.jpg","marron","1m57","Shire","Ecuries Vaillant","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre","123"));
    horses.push(new Horse(null,"Kazan","38719","male","27/06/11","https://cdn.pixabay.com/photo/2016/10/22/12/13/wild-horses-1760583__340.jpg","blanc tacheté marron","1m48","Hanovre","Ecuries Leblanc","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre","123456789"));
    horses.push(new Horse(null,"Pola","57124","female","05/08/11","https://cdn.pixabay.com/photo/2016/04/15/10/35/horse-1330690__340.jpg","noir","1m27","Icelander","Ecuries Leblanc","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre","123456789"));
        return horses;
    }

    goToHorseDetails(item) {
        // That's right, we're pushing to ourselves!
        console.log("horse chosen : "+item.name);
        this.navCtrl.push(HorsePage, {
          horse: item
        });
    }
}
