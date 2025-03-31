import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: Observable<any[]>;

  constructor(private _http: HttpClient) {    
    this.posts = this._http.get<{id: string, title: string, body: string}[]>('https://jsonplaceholder.typicode.com/posts?_limit=10')
  }
}
