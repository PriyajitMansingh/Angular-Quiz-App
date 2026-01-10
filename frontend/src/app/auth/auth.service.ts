

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private AUTH_API = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // 🔐 SEND EMAIL & PASSWORD TO BACKEND
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.AUTH_API}/login`,
      { email, password }
    );
  }

  // 💾 STORE TOKEN
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔍 CHECK LOGIN STATE
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // 🚪 LOGOUT
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}



 signup(name: string, email: string, password: string) {
  return this.http.post<{ message: string }>(
    `${this.AUTH_API}/register`,
    { name, email, password }
  );
}

getProfile() {
  return this.http.get<any>(
    'http://localhost:5000/api/user/profile'
  );
}

isAdmin(): boolean {
  return localStorage.getItem('role') === 'admin';
}

setUserProfile(user: any) {
  localStorage.setItem('role', user.role);
}

loadProfileIfTokenExists() {
  const token = localStorage.getItem('token');

  if (token && !localStorage.getItem('role')) {
    this.getProfile().subscribe({
      next: (res) => {
        localStorage.setItem('role', res.user.role);
      },
      error: () => {
        this.logout();
      }
    });
  }
}



}

