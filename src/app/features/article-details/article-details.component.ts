import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle } from 'src/app/core/services/bookmark.service';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  article: NewsArticle | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsService.getArticleById(id).subscribe(article => {
        this.article = article;
        if (!this.article) {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.router.navigate(['/home']);
    }
  }
}
