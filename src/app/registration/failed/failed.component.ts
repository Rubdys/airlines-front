import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 2000)
  }

}
