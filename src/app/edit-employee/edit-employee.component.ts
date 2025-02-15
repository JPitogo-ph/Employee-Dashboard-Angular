import { Component, inject, Input, OnInit } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent implements OnInit {
  service = inject(EmployeeDataService);
  location = inject(Location);
  fb = inject(FormBuilder);

  @Input('id') employeeId = '';
  employeeDetails = this.service.employeeDetails

  ngOnInit(){
    this.service.employeeId.set(this.employeeId);

    let updateEmployeeForm = this.fb.group({
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
      hireDate: [Date.now(), Validators.required],
      jobId: ['', {
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(5)]
      }],
      salary: ['', Validators.required],
      commissionPct: [''],
      managerId: [''],
      departmentId: ['', Validators.required],
    })
  }
}
