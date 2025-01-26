import { Component, inject } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeDataService } from '../employee-data.service';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  employeeService = inject(EmployeeDataService);
  employeeList = this.employeeService.employeeCacheAccess
}
