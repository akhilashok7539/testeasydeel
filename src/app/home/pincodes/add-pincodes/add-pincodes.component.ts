import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EasydealService } from 'src/app/_services/easydeal.service';

@Component({
  selector: 'app-add-pincodes',
  templateUrl: './add-pincodes.component.html',
  styleUrls: ['./add-pincodes.component.css']
})
export class AddPincodesComponent implements OnInit {

  locationFormRegistration:FormGroup;
  submitted = false;
  
  location;
  isLoading = false;
  button = 'Submit';
  // cimage;
  // des;  
  // mtype="";
  // mctype="";
  // mstyle="";
  
  constructor(private formbuilder:FormBuilder,private easydealservice:EasydealService, private router:Router,private taostr:ToastrService) { }

  ngOnInit() {
    this.locationFormRegistration = this.formbuilder.group(
      {
        location: ['', Validators.required],
        // cimage:['', Validators.required],
        // des: ['', Validators.required],
        // mtype: ['', Validators.required],
        // mctype: ['', Validators.required],
        // mstyle: ['', Validators.required],
    })

  }
get f() { return this.locationFormRegistration.controls; }

  submit(){
    this.submitted = true;
  this.isLoading = true;
  this.button = 'Processing';

    // stop here if form is invalid
    if (this.locationFormRegistration.invalid) {
      this.isLoading = false;
      this.button = 'submit';
      return;
    }
    else{ 
      this.isLoading = true;
      this.button = 'Processing';

      let req={
        "location":this.location,
        "state":"Active"
      }
      this.easydealservice.addlocation(req).subscribe(
        data =>
        {
        this.isLoading = false;
        this.button = 'Submit';
        this.router.navigate(['/pincodes']);
        this.taostr.success("location added successfully");
        },

        error =>{
          this.isLoading = false;
        this.button = 'Submit';
          this.taostr.error("location added unsuccessful");

        }
      )
    }
  }
}
