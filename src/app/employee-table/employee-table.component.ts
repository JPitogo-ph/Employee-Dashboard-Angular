import { Component, inject } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  employeeService = inject(EmployeeDataService);
  employeeList = this.employeeService.employeeCacheAccess
}
