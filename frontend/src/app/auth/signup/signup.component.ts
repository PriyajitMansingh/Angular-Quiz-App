// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html'
// })
// export class SignupComponent {

//   name = '';
//   email = '';
//   password = '';

//   constructor(
//     private auth: AuthService,
//     private router: Router
//   ) {}

//  signup() {
//   this.auth.signup(this.name, this.email, this.password).subscribe({
//     next: () => {
//       alert('Signup successful');
//       this.router.navigate(['/login']);
//     },
//     error: () => {
//       alert('Signup failed');
//     }
//   });
// }

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  signup() {
    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: (res) => {
        alert(res.message);   // "User registered"
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.error || 'Signup failed');
      }
    });
  }
}

