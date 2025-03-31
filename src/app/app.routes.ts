import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';

export const routes: Routes = [
    { path: '', component: PostsComponent },
    { path: 'post/:id', component: PostComponent},
    { path: 'about', component: AboutComponent },
    { path: '**' , redirectTo:  '', pathMatch: 'full'}
];
