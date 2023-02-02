import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../shared/api/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email = '';
  name = '';
  password = '';
  errorMsg = '';
  confirmPassword = '';

  constructor( private authService: AuthService ,private router: Router) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.email && this.name && this.password && this.confirmPassword && (this.password === this.confirmPassword)) {
      this.authService.register({email: this.email, name: this.name, password: this.password}).subscribe(() => {
          this.errorMsg = '';
          this.router.navigate(['login']);
        },
        error => {
          this.errorMsg = error;
        });
    }
  }


}
