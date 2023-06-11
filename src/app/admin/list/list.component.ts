import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef: MatDialogRef<ListComponent>) {}
  
  disableSelect = new FormControl(false);
  favoriteBrand!: string;
  brand: string[] = ['Lenovo', 'Apple', 'Asus', 'Hp'];
  actionBtn : string = "Save"

  productForm!: FormGroup;
  ngOnInit(): void{
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      date : ['', Validators.required],
      favoriteBrand : ['', Validators.required],
      price : ['', Validators.required],
      details : ['', Validators.required]
    })    

    // console.log(this.editData)
    if (this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['favoriteBrand'].setValue(this.editData.favoriteBrand);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['details'].setValue(this.editData.details);
    }
  }
  
  addProduct(){
    // console.log(this.productForm.value)

    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res) => {
          alert("Product added successfully")
          this.productForm.reset();
          this.dialogRef.close('save')
        },
        error:() => {
          alert("Error while adding the product")
        }
      })
    }
  }
}
