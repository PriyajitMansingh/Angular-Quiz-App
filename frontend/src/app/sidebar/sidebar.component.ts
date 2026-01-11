
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubjectService } from '../services/subject.service';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  categories: any[] = [];
  subjectsMap: { [key: string]: any[] } = {};

  openCategoryId: string | null = null;
  selectedSubjectId: string | null = null;

  isLoggedIn=false;

  constructor(
    private categoryService: CategoryService,
    private subjectService: SubjectService,
    private sidebarService: SidebarService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      }
    });
  }

  toggleCategory(categoryId: string) {
    this.openCategoryId =
      this.openCategoryId === categoryId ? null : categoryId;

    if (!this.subjectsMap[categoryId]) {
      this.subjectService.getSubjectsByCategory(categoryId).subscribe({
        next: (subjects) => {
          this.subjectsMap[categoryId] = subjects;
        }
      });
    }
  }

  selectSubject(subjectId: string) {
    this.selectedSubjectId = subjectId;
    this.sidebarService.selectCategory(subjectId);
  }

    logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

