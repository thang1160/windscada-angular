import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'windscada-angular';
  // create constructor with router and global service
  constructor(private router: Router, private global: GlobalService) { }

  // create ngOnInit and check global service for active profile and redirect to login if not logged in
  ngOnInit(): void {
    if (!this.global.activeProfile.id) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }
}
