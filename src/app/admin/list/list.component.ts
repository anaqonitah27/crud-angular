import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private dialogRef: MatDialogRef<ListComponent>) {}
  
  disableSelect = new FormControl(false);
  favoriteBrand!: string;
  brand: string[] = ['Lenovo', 'Apple', 'Asus', 'Hp'];

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
