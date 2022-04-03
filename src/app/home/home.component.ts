import {Component, OnInit} from '@angular/core';
import {User} from "../interfaces/user";
import {Router} from "@angular/router";
import {Country} from "../interfaces/country";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  user: User = {id: 0, firstName: "", lastName: "", mail: "", idCard: "", password: "", wallet: {}};
  tempUser: User;
  country = Country;
  chosenDate!: Date;
  oneWay: boolean = true;
  date = new Date();
  startDate = new Date()
  backDate = new Date()
  departureCountry: Country = Country.EMPTY;
  arrivalCountry: Country = Country.EMPTY;

  param: string = "";

  minDate: Date;
  maxDate: Date;

  countryKeys(): Array<string> {
    var keys = Object.values(this.country);
    return keys;
  }

  constructor(private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      // @ts-ignore
      this.tempUser = this.router.getCurrentNavigation()?.extras.state['someUser'];
    } else {
      this.tempUser = {id: -1, firstName: "", lastName: "", mail: "", idCard: "", password: "", wallet: {}};
    }


    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear, currentMonth, currentDay);
    this.maxDate = new Date(currentYear, currentMonth + 1, currentDay);
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser') == null) {
      this.user = this.tempUser;
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    } else {
      // @ts-ignore
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  search() {
    let departureString: string = this.departureCountry;
    let arrivalString: string = this.arrivalCountry;
    let dateString: string = this.date.toString().slice(4, 15);
    let startDateString: string = this.startDate.toString().slice(4, 15);
    let backDateString: string = this.backDate.toString().slice(4, 15);

    this.param = "arrivalCountry="+arrivalString+"&departureCountry="+departureString;

    if(this.oneWay){
      this.param += "&startTime="+dateString+"&backTime="+dateString;
    } else {
      this.param += "&startTime="+startDateString+"&backTime="+backDateString;
    }

    this.router.navigate(['home/'+this.param]);
  }
}
