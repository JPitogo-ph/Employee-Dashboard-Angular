import { Component, Input, OnInit, inject } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  service = inject(EmployeeDataService);
  location = inject(Location)

  @Input('id') employeeId = '';  
  employeeDetails = this.service.employeeDetails;

  ngOnInit(): void {
    this.service.employeeId.set(this.employeeId);
  }

  previousPage(): void {
    this.location.back()
  }
}
