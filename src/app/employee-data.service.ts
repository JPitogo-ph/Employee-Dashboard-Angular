import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  apiUrl = environment.baseUrl + "api/Employees"
  http = inject(HttpClient)

  getEmployees(): Observable<Employee[]> {
     return this.http.get<Employee[]>('https://localhost:7044/api/employees')
}}
