import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookmarkService, NewsArticle } from 'src/app/core/services/bookmark.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {
  bookmarks: NewsArticle[] = [];
  filteredBookmarks: NewsArticle[] = [];  // filtered based on search
  private destroy$ = new Subject<void>();

  constructor(
    private newsService: NewsService,
    private bookMarkService: BookmarkService,
    private router: Router) { }

  ngOnInit() {
    this.bookmarks = this.bookMarkService.getBookmarks();
    this.filteredBookmarks = [...this.bookmarks];

    // Subscribe to bookmark search
    this.newsService.bookmarkSearch$.pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        if (query && query.trim() !== '') {
          this.filteredBookmarks = this.bookmarks.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase())
          );
        } else {
          this.filteredBookmarks = [...this.bookmarks];
        }
      });
  }

  openDetails(article: NewsArticle) {
    this.router.navigate(['/article', article.id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
