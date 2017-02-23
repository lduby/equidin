import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HorsePage } from '../horse/horse';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  nav: NavController = null;
  results: any = {};
    http: any = null;
  keyword = '';
    
constructor(public navCtrl: NavController, public navParams: NavParams, httpService: Http) {
      this.nav = navCtrl;
      this.results = this.getResults();
      this.http = httpService; 
      this.keyword = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
    
getResults() {
return [
    {
        "name": "Aramis",
        "horse_sire": "25786",
        "birth_date": "12/12/12",
        "coat_color": "blanc",
        "height": "1m32",
        "race": "Reiterhof",
        "picture": "https://cdn.pixabay.com/photo/2015/10/26/01/37/horse-1006558__340.jpg",
        "gender": "female",
        "stable": "Ecuries Vaillant",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre",
        "owner": "123"
    },
    {
        "name": "Eragon",
        "horse_sire": "42783",
        "birth_date": "10/02/09",
        "coat_color": "marron",
        "height": "1m57",
        "race": "Shire",
        "picture": "https://cdn.pixabay.com/photo/2016/09/29/20/37/shire-horse-1703729__340.jpg",
        "gender": "male",
        "stable": "Ecuries Vaillant",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre",
        "owner": "123"
    },
    {
        "name": "Kazan",
        "horse_sire": "38719",
        "birth_date": "27/06/11",
        "coat_color": "blanc tacheté marron",
        "height": "1m48",
        "race": "Hanovre",
        "picture": "https://cdn.pixabay.com/photo/2016/10/22/12/13/wild-horses-1760583__340.jpg",
        "gender": "male",
        "stable": "Ecuries Leblanc",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre",
        "owner": "123456789"
    },
    {
        "name": "Pola",
        "horse_sire": "57124",
        "birth_date": "05/08/11",
        "coat_color": "noir",
        "height": "1m27",
        "race": "Icelander",
        "picture": "https://cdn.pixabay.com/photo/2016/04/15/10/35/horse-1330690__340.jpg",
        "gender": "female",
        "stable": "Ecuries Leblanc",
        "about": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collige omnia, quae soletis: Praesidium amicorum. Tu autem negas fortem esse quemquam posse, qui dolorem malum putet. Negat enim summo bono afferre",
        "owner": "123456789"
    },
]
}
    
onInput(e) {
    console.log("Searching for "+this.keyword);
//    this.http.get('api_url'+this.keyword).subscribe((response) => {
//    this.results = response.json().results;
//    });
}

    }
