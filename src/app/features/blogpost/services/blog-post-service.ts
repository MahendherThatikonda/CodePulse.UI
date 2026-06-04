import { inject, Injectable, InputSignal } from '@angular/core';
import { AddBlogPostRequest, BlogPost, UpdateBlogPostRequest } from '../models/blogpost.model';
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

  getBlogPostById(id:InputSignal<string | undefined>): HttpResourceRef<BlogPost|undefined>{
   return httpResource<BlogPost>(()=>'${this.apiBaseUrl}/api/blogposts/${id()}');
  }

  editBlogPost(id:string,body:UpdateBlogPostRequest):Observable<BlogPost>{
   return  this.http.put<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`,body)
  }

  deleteBlogPost(id:string):Observable<BlogPost>{
   return this.http.delete<BlogPost>(`${this.apiBaseUrl}/api/blogposts/${id}`)
  }
}
