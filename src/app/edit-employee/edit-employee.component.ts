import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  service = inject(EmployeeDataService);
  location = inject(Location);
  fb = inject(FormBuilder);

  @Input('id') employeeId = '';
  employeeDetails = this.service.employeeDetails;
  hireDate = '2022-07-07'

  loadEmployeeData() {
    const emp = this.employeeDetails();
    const rawHireDate = this.employeeDetails()?.hireDate as unknown as string //This took me 5 hours to fix and display on template
    const formattedHireDate = rawHireDate.split('T')[0]

    this.updateEmployeeForm.patchValue({
      employeeId: emp?.employeeId,
      firstName: emp?.firstName,
      lastName: emp?.lastName,
      email: emp?.email,
      phoneNumber: emp?.phoneNumber,
      hireDate: formattedHireDate,
      jobId: emp?.jobId,
      salary: emp?.salary,
      commissionPct: emp?.commissionPct,
      managerId: emp?.managerId,
      departmentId: emp?.departmentId
    })
  }

  submitForm() {
    console.log()
  }

  previousPage() {
    this.location.back()
  }

  updateEmployeeForm = this.fb.group({
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
    hireDate: ['', Validators.required],
    jobId: ['', {
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(5)]
    }],
    salary: [0, Validators.required],
    commissionPct: [0.0],
    managerId: [0],
    departmentId: [0, Validators.required],
  })

  ngOnInit(){
    this.service.employeeId.set(this.employeeId);
    this.loadEmployeeData();
    
    this.updateEmployeeForm.controls.employeeId.disable();
  }
}
