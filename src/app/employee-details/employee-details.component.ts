import { Component, Input, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';
import { Employee } from '../models/employee.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

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
  employee = this.service.employeeDetails;

  ngOnInit(): void {
    this.service.employeeId.set(this.employeeId);
  }
}
