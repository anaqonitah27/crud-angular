import { Component,OnInit,ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog} from '@angular/material/dialog';
import { ListComponent } from '../list/list.component';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, 
    private list:MatDialog, private api: ApiService) {}

  ngOnInit(): void {
      this.getAllProduct()
  }
  openDialog() {
    this.list.open(ListComponent, {
        width: '30%'
    });
  }

  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        // console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }
  
  displayedColumns: string[] = ['productName', 'category', 'date', 'favoriteBrand', 'price', 'details', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any){
    this.dialog.open(ListComponent,{
      width: '30%',
      data: row
    })
  }
}
