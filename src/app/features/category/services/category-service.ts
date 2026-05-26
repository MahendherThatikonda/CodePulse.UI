import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { addCategoryrequest, Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http=inject(HttpClient);
  private apiBaseUrl:string='https://localhost:7160'

  addCategoryStatus=signal<'idle'|'loading'|'error'|'sucess'>('idle')

  addCategory(category:addCategoryrequest){
    this.addCategoryStatus.set('loading')
    this.http.post<void>(`${this.apiBaseUrl}/api/categories`,category)
    .subscribe({
      next:() =>{
    this.addCategoryStatus.set('sucess')
      },
      error:()=>{
            this.addCategoryStatus.set('error')
      }
    })
  }

  getAllCategories(){

     return httpResource<Category[]>(()=>
      `${this.apiBaseUrl}/api/categories`
  )
  }
}
