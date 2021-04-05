import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-services/data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: any;

  constructor(public data: DataService) {
    this.loadNews();
  }

  ngOnInit(): void {
  }

  loadNews() {
    this.data.getNews().subscribe((news: any) => {
      this.articles = news.articles
    })
  }
}
