import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private selectedCategorySource = new BehaviorSubject<string>('');

  selectedCategory$ = this.selectedCategorySource.asObservable();

  selectCategory(category: string) {
    this.selectedCategorySource.next(category);
  }
}
