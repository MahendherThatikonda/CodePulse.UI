import { Component, effect, inject, input } from '@angular/core';
import { BlogPostService } from '../services/blog-post-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { UpdateBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent,ImageSelector],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
id=input<string>();
blogPostService=inject(BlogPostService);
categoryService=inject(CategoryService);
imageSelectorService=inject(ImageSelectorService);
router = inject(Router)

private blogPostref= this.blogPostService.getBlogPostById(this.id);
blogPostResponse=this.blogPostref.value;

private categoryRef=this.categoryService.getAllCategories();
categoriesResponse=this.categoryRef.value;

editBlogFormPost=new FormGroup({
    title: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(100)]
    }),
    shortDescription: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(200)]
    }),
      content: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10)]
    }),
      featuredImageUrl: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(200)]
    }),

      urlHandle: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.minLength(10),Validators.maxLength(200)]
    }),
    publishedDate:new FormControl<string>(new Date().toISOString().split('T')[0],{
      nonNullable:true,
      validators:[Validators.required]
    }),
      author: new FormControl<string>('',{
      nonNullable:true,
      validators:[Validators.required,Validators.maxLength(200)]
    }),
      isVisible: new FormControl<boolean>(true,{
      nonNullable:true
    }),
    categories:new FormControl<string[]>([],{
      nonNullable:true,
    }),
  })

  effectRef=  effect(()=>{

    if (this.blogPostResponse()){
    this.editBlogFormPost.patchValue({
      title:this.blogPostResponse()?.title,
      shortDescription:this.blogPostResponse()?.shortDescription,
      author:this.blogPostResponse()?.author,
      featuredImageUrl:this.blogPostResponse()?.featuredImageUrl,
      isVisible:this.blogPostResponse()?.isVisible,
      publishedDate: new Date(this.blogPostResponse()?.publishedDate!).toISOString().split('T')[0],
      urlHandle:this.blogPostResponse()?.urlHandle,
      categories:this.blogPostResponse()?.categories.map(x=>x.id)

    })

    }
  })

  onSubmit(){
    const id=this.id();
    if(id && this.editBlogFormPost.valid){
    const formValue = this.editBlogFormPost.getRawValue();
    const UpdateBlogPostRequestDto: UpdateBlogPostRequest = {
      title:formValue.title,
      shortDescription:formValue.shortDescription,
      content:formValue.content,
      author:formValue.author,
      featuredImageUrl:formValue.featuredImageUrl,
      isVisible:formValue.isVisible,
      publishedDate:new Date(formValue.publishedDate),
      urlHandle:formValue.urlHandle,
      categories:formValue.categories ??[],

};

  this.blogPostService.editBlogPost(id,UpdateBlogPostRequestDto)
  .subscribe({
    next:(response)=>{
//    console.log(response)
     this.router.navigate(['/admin/blogposts'])
    },
    error:() =>{
      console.error("something went wrong")
    }
  })
      
    }
  }

  onDelete(){
    const id=this.id();
    if(id){
      this.blogPostService.deleteBlogPost(id)
      .subscribe({
        next:(response)=>{
          console.log(response);
          this.router.navigate(['/admin/blogposts']);
        },
        error:()=>{
          console.error("Something went Wrong")
        }
      })
    }
  }

  openImageSelector(){
   this.imageSelectorService.displayImageSelector()    
  }
}
