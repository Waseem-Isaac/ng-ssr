import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [AsyncPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  post: Observable<{id: string, title: string, body: string}>;
  constructor (private _route: ActivatedRoute, private _http: HttpClient){
    const postId = this._route.snapshot.params?.['id'];

    this.post = this._http.get<any>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  }
}
