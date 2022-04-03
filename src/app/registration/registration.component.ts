import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = {id: 0, firstName: "", lastName: "", mail: "", idCard: "", password: "", wallet: {}}
  password: string = "";
  match: boolean = false;
  info: string = "Password match"

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    if (this.match) {
      this.httpClient.post<User>("http://localhost:8080/users/register", this.user)
        .subscribe({
          error: () => {
            this.router.navigateByUrl("register/failed");
          },
          next: (response) => {
            this.router.navigateByUrl("register/successful");
          }
        })
    }
  }

  check() {
    if (this.user.password != this.password) {
      this.info = "Password doesn't match"
      this.match = false;
    } else {
      this.info = "Password match"
      this.match = true;
    }
  }

}
