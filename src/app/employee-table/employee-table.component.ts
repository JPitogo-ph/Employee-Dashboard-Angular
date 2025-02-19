import { Component, inject, signal } from '@angular/core';
import { EmployeeDataService } from '../employee-data.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from "./modal.component";
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [RouterLink, ModalComponent],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent {
  router = inject(Router);

  employeeService = inject(EmployeeDataService);
  employeeList = this.employeeService.employeeCacheAccess;

  isModalOpen = signal(false);
  selectedEmployee = signal<Employee | null>(null)

  onRowClick(employeeId: string) {
    this.router.navigate(['/employees', employeeId]);
  }

  onEditClick(event: MouseEvent, employeeId: string) {
    event.stopPropagation(); //There has to be a cleaner way
    this.router.navigate(['/employees/edit', employeeId])
  }

  onDeleteClick(event: MouseEvent, employee: Employee) {
    event.stopPropagation();
    this.selectedEmployee.set(employee)
    this.isModalOpen.set(true);
  }

  closeModal(flag: boolean) {
    this.isModalOpen.set(flag)
  }
}
