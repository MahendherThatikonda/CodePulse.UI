import { Component, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { effect } from '@angular/core';
import { UpdateCategoryRequest } from '../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {

constructor(){
  effect(()=>{
    if(this.categoryService.updateCategoryStatus()==='sucess'){
    this.categoryService.updateCategoryStatus.set('idle')
     this.router.navigate(['/admin/categories']);
    }

    if(this.categoryService.updateCategoryStatus()==='error'){
     this.categoryService.updateCategoryStatus.set('error')
     console.log("Something went wrong");
    }
  })
}

id=input<string>();

private categoryService=inject(CategoryService);
private router=inject(Router);

categoryResourceref=this.categoryService.getCategoryById(this.id)
categoryResponse=this.categoryResourceref.value;

  editcategoryFormGroup=new FormGroup(
  {
    name: new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]  }),
    urlHandle: new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]}),
  }
);


get nameFormControl(){
  return this.editcategoryFormGroup.controls.name
}

get UrlHandleFormControl(){
  return this.editcategoryFormGroup.controls.urlHandle
}

effectRef= effect(()=>{
 this.editcategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name??'') 
  this.editcategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle??'') 
})

onSubmit(){
  const id=this.id();
  if(!this.editcategoryFormGroup.valid || !id){
   return;
  }

  const formRawValue=this.editcategoryFormGroup.getRawValue();
  const updateCategoryRequestDto:UpdateCategoryRequest={
    name:formRawValue.name,
    urlHandle:formRawValue.urlHandle,
  }

 this.categoryService.updateCategory(id,updateCategoryRequestDto)
}

deleteCategory(){
  const id=this.id();
if(!id){
  return;
}

this.categoryService.deleteCategory(id)
.subscribe({
  next:()=>{
    this.router.navigate(['/admin/categories']);
  },
  error:()=>{
    console.error("Something went wrong");
  },
})

}

}
