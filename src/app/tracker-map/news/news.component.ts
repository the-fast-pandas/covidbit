import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-covid-services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: any;

  constructor(public api: ApiService) {
    this.loadNews();
  }

  ngOnInit(): void {
  }

  loadNews() {
    this.api.getNews().subscribe((news: any) => {
      console.log(JSON.parse(news.body).articles)
      this.articles = JSON.parse(news.body).articles
      //console.log(JSON.parse(news.body).data)
     // this.articles = JSON.parse(news.body).data
    })
  }
}
