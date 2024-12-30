import { Component, OnInit, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';
import { Employee } from '../models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId!: string | null;
  employee!: Signal<Employee | []>;

  route = inject(ActivatedRoute);
  service = inject(EmployeeDataService);

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.employee = toSignal(this.service.getEmployeeById(this.employeeId), {initialValue: []});
  }
}
