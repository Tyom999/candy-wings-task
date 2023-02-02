import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/api/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): void {
      this.authService.login({email: this.email, password: this.password}).subscribe(() => {
          this.errorMsg = '';
          this.router.navigate(['/user']);
        },
        error => {
          this.errorMsg = error;
        }
      );
  }
}
