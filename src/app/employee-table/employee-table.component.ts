import { Component, inject } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  router = inject(Router);

  employeeService = inject(EmployeeDataService);
  employeeList = this.employeeService.employeeCacheAccess;

  onRowClick(employeeId: string) {
    this.router.navigate(['/employees', employeeId]);
  }

  onEditClick(event: MouseEvent, employeeId: string) {
    event.stopPropagation(); //There has to be a cleaner way
    this.router.navigate(['/employees/edit', employeeId])
  }

  onDeleteClick(event: MouseEvent, employeeId: string) {
    return true
  }
}
