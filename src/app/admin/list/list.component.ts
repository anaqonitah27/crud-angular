import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor() {}
  
  disableSelect = new FormControl(false);
  favoriteBrand!: string;
  brand: string[] = ['Lenovo', 'Apple', 'Asus', 'Hp'];
}
