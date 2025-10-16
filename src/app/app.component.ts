import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from './core/services/news.service';
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  searchText = '';
  currentRoute = '';
  isDark = false;
  isBookmarksPage = false;

  constructor(private newsService: NewsService, private router: Router) {
  }

  ngOnInit() {
    // Detect current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.isBookmarksPage = event.urlAfterRedirects.includes('/bookmarks');
      this.currentRoute = event.urlAfterRedirects;
      this.searchText = '';
    });

    // Handle search input
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      if (this.currentRoute.startsWith('/home')) {
        this.newsService.searchNews(query);        // API search
      } else if (this.currentRoute.startsWith('/bookmarks')) {
        this.newsService.searchBookmarks(query);  // Bookmark search
      }
    });
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  selectCategory(category: string) {
    //If search is active, clear it before applying category
    if (this.searchText && this.searchText.trim() !== '') {
      this.searchText = '';
      this.searchSubject.next('');
    }
    if (!this.isBookmarksPage) {
      this.newsService.selectCategory(category);
    }
  }

  onSearchInput() {
    this.searchSubject.next(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.searchSubject.next('');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
