import { Injectable } from '@angular/core';

export interface NewsArticle {
  id: number | null;
  source: {
    id: string | null;
    name: string | null;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  category: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks: NewsArticle[] = [];

  constructor() {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
      this.bookmarks = JSON.parse(saved);
    }
  }

  getBookmarks(): NewsArticle[] {
    return this.bookmarks;
  }

  isBookmarked(article: NewsArticle): boolean {
    return this.bookmarks.some(a => a.url === article.url);
  }

  toggleBookmark(article: NewsArticle) {
    const index = this.bookmarks.findIndex(a => a.url === article.url);
    if (index > -1) {
      // Remove bookmark
      this.bookmarks.splice(index, 1);
    } else {
      // Add bookmark
      this.bookmarks.push(article);
    }
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }
}
