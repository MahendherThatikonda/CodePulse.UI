import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { addCategoryrequest, Category,  UpdateCategoryRequest } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http=inject(HttpClient);
  private apiBaseUrl:string='https://localhost:7160'

  addCategoryStatus=signal<'idle'|'loading'|'error'|'sucess'>('idle')
  updateCategoryStatus=signal<'idle'|'loading'|'error'|'sucess'>('idle')

  addCategory(category:addCategoryrequest){
    this.addCategoryStatus.set('loading')
    this.http.post<void>(`${this.apiBaseUrl}/api/categories`,category,{
      withCredentials:true
    })
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
  
  getCategoryById(Id:InputSignal<string|undefined>){
  return httpResource<Category>(()=>`${this.apiBaseUrl}/api/categories/${Id()}`)
  }

  updateCategory(id:string,updateCategoryRequestDto:UpdateCategoryRequest){
    this.updateCategoryStatus.set('loading')
  this.http.put<void>(`${this.apiBaseUrl}/api/category/${id}`,updateCategoryRequestDto,{
    withCredentials:true
  })
  .subscribe({
    next:()=>{
      this.updateCategoryStatus.set('sucess')
    },
    error:()=>{
            this.updateCategoryStatus.set('error')
    }
  })
  }


  deleteCategory(id:string):Observable<void>{
//    const x = this.http.delete(`${this.apiBaseUrl}/api/categories/${id}`)
return this.http.delete<void>(`${this.apiBaseUrl}/api/categories/${id}`,{
  withCredentials:true
})
  }

}
