import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";
import {DataService} from "../services/DataService";
import {LoginData} from "../interfaces/loginData";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {mail: "", password: ""}
  loginInfo: string = "";

  constructor(private router: Router, private httpClient: HttpClient, private data: DataService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.httpClient.post<User>("http://localhost:8080/users/login", this.loginData)
      .subscribe({
        error: () => {
          this.loginInfo = "Wrong email or password"
        },
        next: (response) => {
          console.log(response)
          this.data.set(true)
          this.router.navigate(['home'], {state: {someUser: response}});
        }
      })
  }

  register() {
    this.router.navigateByUrl("/register");
  }
}
