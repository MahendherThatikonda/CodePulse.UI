import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addCategoryrequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {

  private router=inject(Router);

  constructor(){
      effect(()=>{
    if(this.categoryService.addCategoryStatus()==='sucess'){
          this.categoryService.addCategoryStatus.set('idle');
          this.router.navigate(['/admin/categories'])
    }

    if(this.categoryService.addCategoryStatus()==='error'){
      console.log("Add Category Request Failed")
    }
  })
  }
private categoryService= inject(CategoryService)

  addcategoryFormGroup=new FormGroup(
  {
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.maxLength(100)]  }),
    urlHandle: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.maxLength(100)]}),
  }
);


get nameFormControl(){
  return this.addcategoryFormGroup.controls.name
}

get UrlHandleFormControl(){
  return this.addcategoryFormGroup.controls.urlHandle
}

onSubmit(){
  const addCategoryFormValue=  this.addcategoryFormGroup.getRawValue();

  const addCategoryRequestDto:addCategoryrequest={
    name:addCategoryFormValue.name,
    urlHandle:addCategoryFormValue.urlHandle
  }

  this.categoryService.addCategory(addCategoryRequestDto);

}
}
