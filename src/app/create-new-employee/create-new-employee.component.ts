import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-new-employee.component.html',
  styleUrl: './create-new-employee.component.scss'
})
export class CreateNewEmployeeComponent {
  private fb = inject(FormBuilder)

  //This project is mainly a frontend learning experience. Take the easy way out and make sure backend always get's the right data (mostly).
  newEmployeeForm = this.fb.group({
    employeeId: [0, Validators.required],
    firstName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(32)],
    lastName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(16)],
    email: ['', Validators.required, Validators.email, Validators.min(2), Validators.maxLength(32)],
    phoneNumber: ['', Validators.required, Validators.minLength(4), Validators.maxLength(16)],
    hireDate: [Date.now()],
    jobId: ['', Validators.required, Validators.minLength(4), Validators.maxLength(5)],
    salary: [0, Validators.required],
    commissionPct: [0.0],
    managerId: [null],
    departmentId: ['', Validators.required],
  })
}
