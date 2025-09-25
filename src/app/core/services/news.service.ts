import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { NewsArticle } from './bookmark.service';

interface Articles {
  articles: NewsArticle[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'assets/mock-news.json';
  private categorySubject = new Subject<string>();
  category$ = this.categorySubject.asObservable();

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  private bookmarkSearchSubject = new Subject<string>();
  bookmarkSearch$ = this.bookmarkSearchSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Load ALL mock articles
  private getAllArticles(): Observable<NewsArticle[]> {
    return this.http.get<Articles>(this.baseUrl).pipe(
      map((res: Articles) => res.articles || [])
    );
  }

  // Top headlines (just return all articles or latest ones)
  getTopHeadlines(): Observable<NewsArticle[]> {
    return this.getAllArticles().pipe(
      map(articles =>
        articles.slice(0, 20) // show first 20 as "top"
      )
    );
  }

  // Filter by category
  getByCategory(category: string): Observable<NewsArticle[]> {
    return this.getAllArticles().pipe(
      map(articles =>
        articles.filter(a => a.category === category)
      )
    );
  }

  // Search inside mock JSON
  getBySearch(query: string): Observable<NewsArticle[]> {
    return this.getAllArticles().pipe(
      map(articles =>
        articles.filter(a =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.description.toLowerCase().includes(query.toLowerCase()) ||
          a.content.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getArticleById(id: string): Observable<NewsArticle | undefined> {
    const numericId = Number(id); 
    return this.getAllArticles().pipe(
      map(articles => articles.find(a => a.id === numericId))
    );
  }

  selectCategory(category: string) {
    this.categorySubject.next(category);
  }

  searchNews(query: string) {
    this.searchSubject.next(query);
  }

  searchBookmarks(query: string) {
    this.bookmarkSearchSubject.next(query);
  }

}
