import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res) => {
      this.auth.saveToken(res.token);

      // 🔹 fetch profile after login
      this.auth.getProfile().subscribe(profile => {
        this.auth.setUserProfile(profile.user);
        this.router.navigate(['/card-list']);
      });
    },
    error: () => {
      alert('Invalid credentials');
    }
  });
}

ngOnInit() {
  if (this.auth.isLoggedIn()) {
    this.router.navigate(['/card-list']);
  }
}

}
