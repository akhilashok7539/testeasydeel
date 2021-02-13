import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EasydealService } from '../_services/easydeal.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  displayedColumns = ['menuimage', 'menudescription',  'location','totalquantitytopurchase', 'price','action'];
  dataSource = new MatTableDataSource();
  results;
  apiurl;
  status;
  userdetails;
  locationid;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor( private easydeelservice: EasydealService, private toaster: ToastrService, private router: Router) { }

  ngOnInit() {
    this.apiurl="https://sahachara.com/";
    this.status = JSON.parse(localStorage.getItem("loginstatus"));

    this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    this.getalloffers();
    console.log(status);
  }

  getalloffers()
  {
    
    if(this.status =='masteradmin')
    {
    this.easydeelservice.getalloffers().subscribe(
      data =>{
       
        this.results = data;
        this.dataSource.data = this.results;
      },
      error =>{

      }
    )
  }
    else if(this.status == 'locationamin')   
    {
      this.locationid=this.userdetails['locationId']._id;
      console.log(this.locationid);
      this.easydeelservice.getalloffersybylocation(this.locationid).subscribe(
        data =>{
         
          this.results = data;
          this.dataSource.data = this.results;
        },
        error =>{
  
        }
      )
    }
    else if(this.status =='shopadmin')
    {

    }
  }
  edit(a)
  {
    sessionStorage.setItem("offer",JSON.stringify(a));
    this.router.navigate(['/edit-offers']);
  }
  active(r)
  {
    this.easydeelservice.changeofferstatus(r._id).subscribe(
      data =>{
        this.toaster.success("Status Updated")
        this.ngOnInit();
      },
      error =>{

        this.toaster.error("Unable to update Status")

        this.ngOnInit();

      },
    )

  }
  inactive(r)
  {
    this.easydeelservice.changeofferstatus(r._id).subscribe(
      data =>{
        this.toaster.success("Status Updated")

        this.ngOnInit();
      },
      error =>{
        this.toaster.error("Unable to update Status")

        this.ngOnInit();

      },
    )

  }
}
