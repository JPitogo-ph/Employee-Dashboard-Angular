import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  service = inject(EmployeeDataService);
  

  @Input('id') employeeId = '';  
  employeeDetails = this.service.employeeDetails;

  ngOnInit(): void {
    this.service.employeeId.set(this.employeeId);
  }
}
