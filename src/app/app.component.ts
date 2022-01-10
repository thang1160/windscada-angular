import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public global: GlobalService) { }

  ngOnInit(): void {
    if (!this.global.activeProfile.id) {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  logout() {
    this.global.activeProfile = {
      username: '',
      email: '',
      id: 0,
      functions: Array.from<string>([]),
    };
    document.cookie = `token=;path=/windscada;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
