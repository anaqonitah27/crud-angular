import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private formBuilder: FormBuilder) {}
  
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
    console.log(this.productForm.value)
  }
}
