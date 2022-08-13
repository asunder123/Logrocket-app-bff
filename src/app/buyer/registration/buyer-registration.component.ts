import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Buyer } from '../buyer';
import { isEmpty } from 'lodash'; 
import * as LogRocket from 'logrocket';






/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-buyer-registration',
  templateUrl: './buyer-registration.component.html'
})
export class BuyerRegistrationComponent implements OnInit {
  buyerForm = new FormGroup({
    emailAddress: new FormControl('', [
      //Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) {
  }


  ngOnInit() {
  }

 
	  
if (err) {  
LogRocket.error();
}

  get emailAddress() {  	     
	  const email = String(this.buyerForm.get('emailAddress'));
	  
	  console.log("Email fetched is", email) ;
	
	  return this.buyerForm.get('emailAddress') ; 
	  
	  }
  

  
  get password() { return this.buyerForm.get('password'); }
  


  submit() {
    this.http.post('/api/buyers', this.buyerForm.value)
      .subscribe(
        (successResponse: Buyer) => {
	  try {	
          this.openSnackBar('Registration successful', 'Close');
          this.router.navigate(['/']);
	  }
	  catch (e) {
	  console.error("Navigation error",e) ;
	  } 
        },
        (errorResponse) => {
          this.openSnackBar(errorResponse.error != null ? errorResponse.error.message : errorResponse.message, 'Close');
        }
      );
  }  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
