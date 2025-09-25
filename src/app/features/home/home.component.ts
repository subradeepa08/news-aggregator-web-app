import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BookmarkService, NewsArticle } from 'src/app/core/services/bookmark.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  articles: NewsArticle[] = [];
  isLoading = false;
  currentCategory = '';
  currentSearch = '';
  private destroy$ = new Subject<void>();

  constructor(
    private newsService: NewsService,
    private snackBar: MatSnackBar,
    public bookmarkService: BookmarkService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.initCategoryListener();
    this.initSearchListener();
    this.loadTopHeadlines();
  }

  private initCategoryListener() {
    this.newsService.category$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cat => {
        this.currentCategory = cat || '';
        if (this.currentCategory) {
          this.isLoading = true;
          this.newsService.getByCategory(this.currentCategory).subscribe({
            next: (res: NewsArticle[]) => {
              this.articles = res || [];
              this.isLoading = false;
            },
            error: () => this.handleError('Failed to load category news.')
          });
        } else {
          this.loadTopHeadlines();
        }
      });
  }

  private initSearchListener() {
    this.newsService.search$
      .pipe(takeUntil(this.destroy$))
      .subscribe(q => {
        this.currentSearch = q || '';
        if (this.currentSearch.trim() !== '') {
          this.isLoading = true;
          this.newsService.getBySearch(this.currentSearch).subscribe({
            next: (res: NewsArticle[]) => {
              this.articles = res || [];
              this.isLoading = false;
            },
            error: () => this.handleError('Error fetching search results.')
          });
        } else {
          // search cleared → fallback
          if (this.currentCategory) {
            this.isLoading = true;
            this.newsService.getByCategory(this.currentCategory).subscribe({
              next: (res: NewsArticle[]) => {
                this.articles = res || [];
                this.isLoading = false;
              },
              error: () => this.handleError('Failed to reload category news.')
            });
          } else {
            this.loadTopHeadlines();
          }
        }
      });
  }

  private loadTopHeadlines() {
    this.isLoading = true;
    this.newsService.getTopHeadlines().subscribe({
      next: (res: NewsArticle[]) => {
        this.articles = res || [];
        this.isLoading = false;
      },
      error: () => this.handleError('Error loading top headlines.')
    });
  }

  private handleError(message: string) {
    this.isLoading = false;
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }

  toggleBookmark(article: NewsArticle) {
    this.bookmarkService.toggleBookmark(article);
  }

  openDetails(article: NewsArticle) {
    this.router.navigate(['/article', article.id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
