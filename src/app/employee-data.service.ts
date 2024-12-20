import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Employee {
  EmployeeId: string,
  FirstName: string,
  LastName: string,
  Email: string,
  PhoneNumber: string,
  HireDate: string,
  JobId: string,
  Salary: number,
  CommissionPct: number,
  ManagerId: number,
  DepartmentId: number
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  apiUrl = environment.baseUrl + "api/Employees"
  http = inject(HttpClient)

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
  }
}
