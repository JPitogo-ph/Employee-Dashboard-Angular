import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeDataService } from '../employee-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-new-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-employee.component.html',
  styleUrl: './create-new-employee.component.scss'
})
export class CreateNewEmployeeComponent {
  private fb = inject(FormBuilder)
  private data = inject(EmployeeDataService)
  private location = inject(Location)

  submitForm() {
    if (this.newEmployeeForm.valid) {
      const payload = this.newEmployeeForm.value
      this.data.postData(payload).subscribe({
        next: (response) => {
          console.log("Submitted data: ", response);
          this.data.refreshData()
        },
        error: (err) => {
          console.error(err)
        },
        complete: () => this.location.back()
      })
    }
    else{
      console.log("Form invalid")
    }
  }

  previousPage() {
    this.location.back()
  }

  //This project is mainly a frontend learning experience. Take the easy way out and make sure backend always get's the right data (mostly).
  newEmployeeForm = this.fb.group({
    employeeId: ['', Validators.required],
    firstName: ['', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(32)]
    }],
    lastName: ['', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(16)]
    }],
    email: ['', {
      validators: [Validators.required, Validators.email, Validators.min(2), Validators.maxLength(32)]
   }],
    phoneNumber: ['', {
      validators: [Validators.minLength(4), Validators.maxLength(16)]
    }],
    hireDate: [this.numToDate(Date.now()), Validators.required],
    jobId: ['', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(5)]
    }],
    salary: ['', Validators.required],
    commissionPct: [''],
    managerId: [''],
    departmentId: ['', Validators.required],
  })

  //Helper function to set default value of hireDate in form control
  numToDate(currentDate: number) {
    let formattedDate = new Date(currentDate).toISOString().split('T')[0]
    return formattedDate
  }
}
