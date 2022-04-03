import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/DataService";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedIn !: boolean;

  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit(): void {
    this.loggedIn = this.data.get()
      }

  logOut() {
    this.loggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl('/home')
  }
  logIn(){
    this.router.navigateByUrl('/login')
  }

  register() {
    this.router.navigateByUrl('/registration')
  }
}
