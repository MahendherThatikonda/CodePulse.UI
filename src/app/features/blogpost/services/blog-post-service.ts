import { inject, Injectable } from '@angular/core';
import { AddBlogPostRequest, BlogPost } from '../models/blogpost.model';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  http=inject(HttpClient)
  private apiBaseUrl:string='https://localhost:7160'

  createBlogPost(data:AddBlogPostRequest): Observable<BlogPost>{
   return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogposts`,data)
  }

  getAllBlogPosts():HttpResourceRef<BlogPost[]|undefined> {
  return  httpResource<BlogPost[]>(()=>`${this.apiBaseUrl}/api/blogposts`)
  }
}
