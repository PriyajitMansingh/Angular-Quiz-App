import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedCategory = '';

  constructor(private sidebarService: SidebarService,public auth:AuthService) {}

  ngOnInit(): void {
    this.auth.loadProfileIfTokenExists();
    this.sidebarService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;
    });
  }
}
