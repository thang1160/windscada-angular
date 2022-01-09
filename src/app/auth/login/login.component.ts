import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { StartupService } from 'src/app/service/startup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router, private startupService: StartupService) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (token) => {
        // add token cookie if login successful with path /windscada
        document.cookie = `token=${token};path=/windscada`;
        this.startupService.load().then(() => {
          this.router.navigate(['home'], { replaceUrl: true });
        });
      }, () => {
        alert("Login failed");
      })
  }
}
