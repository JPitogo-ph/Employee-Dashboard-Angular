import { Component, inject } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeDataService } from '../employee-data.service';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  employeeService = inject(EmployeeDataService)
  employees = toSignal(this.employeeService.getEmployees(), {initialValue: []})
}
