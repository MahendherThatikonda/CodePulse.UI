import { Component, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { effect } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
id=input<string>();

private categoryService=inject(CategoryService);

categoryResourceref=this.categoryService.getCategoryById(this.id)
categoryResponse=this.categoryResourceref.value;

  editcategoryFormGroup=new FormGroup(
  {
    name: new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]  }),
    UrlHandle: new FormControl<string>('',{nonNullable:true,
      validators:[Validators.required,Validators.maxLength(100)]}),
  }
);


get nameFormControl(){
  return this.editcategoryFormGroup.controls.name
}

get UrlHandleFormControl(){
  return this.editcategoryFormGroup.controls.UrlHandle
}

effectRef= effect(()=>{
 this.editcategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name??'') 
  this.editcategoryFormGroup.controls.UrlHandle.patchValue(this.categoryResponse()?.UrlHandle??'') 
})

onSubmit(){

}


}
