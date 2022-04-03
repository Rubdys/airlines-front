import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private loggedIn: boolean;
  private user: User;

  constructor() {
    if (localStorage.getItem('currentUser') != null) {
      // @ts-ignore
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.user)
      console.log(this.user.id)
      console.log(this.user.id == -1)
      if (this.user.id == -1) {
        this.loggedIn = false;
        console.log("LOGGED IN FALSE");
      } else{
        this.loggedIn = true;
        console.log("LOGGED IN TRUE");
      }
    } else {
      this.user = {id: -1, firstName: "", lastName: "", mail: "", idCard: "", password: "", wallet: {}};
      this.loggedIn = false;
      console.log("LOGGED IN FALSE");
    }
  }

  get(){
    return this.loggedIn;
  }

  set(isLogged : boolean){
    this.loggedIn = isLogged;
  }

}
